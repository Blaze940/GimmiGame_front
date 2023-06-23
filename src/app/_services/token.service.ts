import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { Injector } from '@angular/core';
import {IToken} from "../_interfaces/IToken";
import {IUser} from "../_interfaces/IUser";
import {IPayload} from "../_interfaces/IPayload";
import {JwtHelperService} from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router : Router, private injector : Injector, private jwtHelper : JwtHelperService) { }

  saveToken(token : string) {
    localStorage.setItem('token', token);
  }

  getCurrentUserToken()  : string | null {
    return localStorage.getItem('token');
  }

  isLogged() : boolean {
    return this.getCurrentUserToken() !== null;
  }

  clearStorage() : void {
    localStorage.clear();
  }

  //a tester
  extractPseudoFromPayload(token: string): string | null {
    const decodedToken = this.jwtHelper.decodeToken(token) as { pseudo: string };
    if (!decodedToken) {
      return null;
    }
    const pseudo = decodedToken.pseudo;
    return pseudo;
  }

}
