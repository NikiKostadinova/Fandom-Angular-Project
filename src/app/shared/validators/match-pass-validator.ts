import { FormGroup, ValidatorFn } from "@angular/forms";

export function matchPassValidator(passControl: string, rePassControl: string): ValidatorFn{
    return (control) => {
 
        const group = control as FormGroup;
        const passCtrl = group.get(passControl);
        const rePassCtrl = group.get(rePassControl);
        return passCtrl?.value === rePassCtrl?.value ? null : { matchPassValidator: true };
    }
}