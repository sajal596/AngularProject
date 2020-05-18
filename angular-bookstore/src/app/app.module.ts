import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookGridListComponent } from './book-grid-list/book-grid-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookCategoryComponent } from './book-category/book-category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AboutComponent } from './about/about.component';
import { ContantComponent } from './contant/contant.component';

@NgModule({
  declarations: [
    AppComponent,
    BookGridListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    ShoppingCartComponent,
    LoginComponent,
    RegisterComponent,
    BookDetailsComponent,
    AboutComponent,
    ContantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    StorageServiceModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
      {provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true}
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
