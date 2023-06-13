import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LandpageComponent } from './pages/landpage/landpage.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AppResumeCardComponent } from './components/app-resume-card/app-resume-card.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';

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
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
  exports: [
    RegisterCardComponent,
    HeaderComponent,
    LoginCardComponent
  ]
})
export class AppModule {}
