import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = 'user';

  subscription: Subscription;

  get isLogged(): boolean {

    return !!this.user;
  }

  constructor(private http: HttpClient) {
    // try {
    //   const lsUser = localStorage.getItem(this.USER_KEY) || '';
    //   this.user = JSON.parse(lsUser);
    // } catch (error) {
    //   this.user = undefined;
    // }

    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });

    const userString = localStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      this.user$$.next(user);
    }
  }


  login(email: string, password: string) {

    const { apiUrl } = environment;

    // this.user = {
    //   email: 'john.doe@gmail.com',
    //   username: 'John',
    //   password: '123456'
    // };

    // localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
 
    
   
    return this.http.post<User>(`${ apiUrl }/api/users/login`, { email, password })
      .pipe(tap((user) => {
        this.user$$.next(user)
        localStorage.setItem('user', JSON.stringify(user))
      }));

  }

  register(username: string, email: string, password: string, rePassword: string) {
    const { apiUrl } = environment;


    // this.user = {
    //   email: 'john.doe@gmail.com',
    //   username: 'John',
    //   password: '123456'
    // };

    // localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));

    return this.http.post<User>(`${ apiUrl }/api/users/register`, { username, email, password, rePassword })
      .pipe(tap((user) => {
        this.user$$.next(user)
        localStorage.setItem('user', JSON.stringify(user))
      }));

  }

  logout(): void {
    // this.user = undefined;
    // localStorage.removeItem(this.USER_KEY);

    // return this.http
    // .post<User>('/api/users/logout', {})
    // .pipe(tap(() => {
    //   this.user$$.next(undefined)
    //   localStorage.removeItem('user')
    // }))

    localStorage.removeItem(this.USER_KEY);
    this.user$$.next(undefined);
  }

  getProfile() {
    const { apiUrl } = environment;

    return this.http
      .get<User>(`${ apiUrl }/api/users/profile`)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string, tel?: string) {
    const { apiUrl } = environment;

    return this.http
      .put<User>(`${ apiUrl }/api/users/profile`, { username, email })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
