import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router : Router) { }

  saveToken(token : string) {
    localStorage.setItem('token', token);
  }

  getToken()  : string | null {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
    //maybe add Item('pseudo') and remove it here
    //maybe add a redirection to login page

  }

  isLogged() : boolean {
    return this.getToken() !== null;
  }

  logout() : void {
    this.removeToken();
    //maybe add Item('pseudo') and remove it here
    this.router.navigate(['/login']);
  }
}
