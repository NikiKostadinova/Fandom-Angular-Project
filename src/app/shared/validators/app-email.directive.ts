import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, ValidatorFn, NG_VALIDATORS } from '@angular/forms';
import { appEmailValidator} from './app-email-validator';
import { UserService } from 'src/app/user/user.service';

@Directive({
  selector: "[appEmail]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AppEmailDirective,
      multi: true,
    },
  ],
})
export class AppEmailDirective implements Validator, OnChanges {
  @Input() appEmail: string[] = [];

   validator: ValidatorFn = () => null;

  constructor(private userService: UserService) { }

  validate( control: AbstractControl<any, any>): ValidationErrors | null {
    
    return this.validator(control);
  }

  

  ngOnChanges(changes: SimpleChanges): void {
    const currentEmailChanges = changes["appEmail"];
    if(currentEmailChanges){
      this.validator = appEmailValidator(currentEmailChanges.currentValue);
    }
  }

}
