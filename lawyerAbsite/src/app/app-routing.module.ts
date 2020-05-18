import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOfLawyerComponent } from './components/list-of-lawyer/list-of-lawyer.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"search/:search",component:ListOfLawyerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
