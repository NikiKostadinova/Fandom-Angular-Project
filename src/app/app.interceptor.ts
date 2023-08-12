import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { ErrorService } from "./core/error/error.service";

const { apiUrl } = environment;


@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private router: Router, private errorService: ErrorService) {

    }



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.startsWith('/api')) {
            const token = sessionStorage.getItem('token');
            console.log(token)
            req = req.clone({
                url: req.url.replace('/api', apiUrl),
                withCredentials: true,
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }

        return next.handle(req).pipe(

            catchError((err) => {
                
                if (err.error.message === 'Invalid email or password') {
                                    
                    this.errorService.setError(err.error);
                    this.router.navigate(['/error']);

                }else if (err.error.message === 'Email exists'){
                    this.errorService.setError(err.error);
                    this.router.navigate(['/error']);
                }else if (err.status === 401) {
                    this.errorService.setError(err);
                   
                    this.router.navigate(['/home']);
                } else {
                    this.errorService.setError(err);
                    this.router.navigate(['/error']);
                }

                return [err];
            }),
            map(event => {
                if (event instanceof HttpResponse && event.status === 401) {
                    const errorResponse = event.body;
                    if (errorResponse && errorResponse.error) {
                        // Display the error message to the user
                        alert(errorResponse.error); // You can use any UI component or service to show the error
                    }
                }
                return event;
            })

        );
    }
}

export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS
}