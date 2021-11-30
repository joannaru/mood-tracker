import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ShowDataComponent } from 'src/app/components/show-data/show-data.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { StartComponent } from 'src/app/components/start/start.component';

const routes:Routes=[
  {path:'',redirectTo:'/start', pathMatch:'full'},//pathMatch:'full'
  {path:'start',component:StartComponent},
  {path:'form',component:FormComponent},
  {path:'saved',component:ShowDataComponent},
  //{path:'**',},
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
