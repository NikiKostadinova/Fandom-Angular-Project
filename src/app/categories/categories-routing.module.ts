import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AuthActivate } from '../core/guards/auth.activate';


const routes: Routes = [
    { path: 'categories', component: MainComponent },
    { path: 'add-category', component: AddCategoryComponent, canActivate: [AuthActivate]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }