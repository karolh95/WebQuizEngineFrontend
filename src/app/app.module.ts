import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { HomeModule } from '@components/home/home.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from '@interceptors/basic-auth.interceptor';
import { ErrorInterceptor } from '@interceptors/error.interceptor';
import { LoginModule } from '@components/login/login.module';
import { RegisterModule } from '@components/register/register.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	BrowserAnimationsModule,
	HomeModule,
	LoginModule,
	RegisterModule,
	MatToolbarModule,
	MatButtonModule,
	HttpClientModule
  ],
  providers: [
	  { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
	  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
