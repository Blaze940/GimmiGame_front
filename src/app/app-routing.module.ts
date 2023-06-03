import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandpageComponent } from './pages/landpage/landpage.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';

const routes: Routes = [
  { path: 'login', component: LoginCardComponent }, //A CHANGER AVEC LOGIN PAGE

  { path: 'register', component: RegisterCardComponent }, //A CHANGER AVEC REGISTER PAGE

  { path: 'welcome', component: LandpageComponent },

  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
