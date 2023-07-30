import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEmailDirective } from './validators/app-email.directive';
import { SlicePipe } from './pipes/slice.pipe';



@NgModule({
  declarations: [
    AppEmailDirective,
    SlicePipe
  ],
  imports: [
    CommonModule,    
  ],
   exports:  [AppEmailDirective]
})
export class SharedModule { }
