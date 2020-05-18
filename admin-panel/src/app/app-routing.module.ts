import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductsComponent } from './component/addproducts/addproducts.component';
import { DashbordComponent } from './component/dashbord/dashbord.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RecordsComponent } from './component/records/records.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotComponent } from './component/forgot/forgot.component';
import { LoginComponent } from './component/login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouteGurdService } from './share/route-gurd.service';


const routes: Routes = [
  
  {
    path:"login", component:LoginComponent
  },
  {
    path:"", redirectTo:"login" , pathMatch:'full'
  },
  {
    path:"dashboard", component:MainPageComponent,canActivate:[RouteGurdService ],children:[
      {
        path:"register", component:RegisterComponent,canActivate:[RouteGurdService]
      },
      {
        path:"forgot", component:ForgotComponent,canActivate:[RouteGurdService]
      },
      {path:"addproduct",component:AddproductsComponent,canActivate:[RouteGurdService]},
      {
        path:"", component:DashbordComponent,canActivate:[RouteGurdService]
      },
      {
        path:"records", component:RecordsComponent,canActivate:[RouteGurdService]
      }
    ]
  },
  
  {
    path:"**", component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
