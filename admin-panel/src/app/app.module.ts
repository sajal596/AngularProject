import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageServiceModule } from 'ngx-webstorage-service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddproductsComponent } from './component/addproducts/addproducts.component';
import { DashbordComponent } from './component/dashbord/dashbord.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RecordsComponent } from './component/records/records.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotComponent } from './component/forgot/forgot.component';
import { LoginComponent } from './component/login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpInterceptorService } from './share/http-interceptor.service';
import { httpInterceptProviders } from './share';

@NgModule({
  declarations: [
    AppComponent,
    AddproductsComponent,
    DashbordComponent,
    NotFoundComponent,
    RecordsComponent,
    RegisterComponent,
    ForgotComponent,
    LoginComponent,
    NavigationComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    HttpClientModule,
    StorageServiceModule
   

  ],
  providers: [
    httpInterceptProviders
   // {provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
