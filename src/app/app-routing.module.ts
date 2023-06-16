import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandpageComponent } from './pages/landpage/landpage.component';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent }, //A CHANGER AVEC LOGIN PAGE

  { path: 'register', component: RegisterComponent }, //A CHANGER AVEC REGISTER PAGE

  { path: 'welcome', component: LandpageComponent },

  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
