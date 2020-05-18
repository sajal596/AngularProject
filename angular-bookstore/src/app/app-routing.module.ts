import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookGridListComponent } from './book-grid-list/book-grid-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AboutComponent } from './about/about.component';
import { ContantComponent } from './contant/contant.component';


const routes: Routes = [
  {path:'home',component:BookGridListComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'category/:id',component:BookGridListComponent},
  {path:'book/:id',component:BookDetailsComponent},
  {path:'cart',component:ShoppingCartComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContantComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
