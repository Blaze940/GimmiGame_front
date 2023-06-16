import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { LandpageComponent } from './pages/landpage/landpage.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AppResumeCardComponent } from './components/app-resume-card/app-resume-card.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';
import {UserAPIService} from "./_services/userAPI.service";
import { SpinnerComponent } from './components/_tools/spinner/spinner.component';
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";


@NgModule({
  declarations: [
    AppComponent,
    LandpageComponent,
    HeaderComponent,
    AppResumeCardComponent,
    LoginCardComponent,
    LoginComponent,
    RegisterComponent,
    RegisterCardComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, BrowserModule, AppRoutingModule,ReactiveFormsModule, HttpClientModule],
  providers: [UserAPIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
