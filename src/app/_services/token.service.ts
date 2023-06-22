import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { Injector } from '@angular/core';
import {IToken} from "../_interfaces/IToken";
import {IUser} from "../_interfaces/IUser";
import {IPayload} from "../_interfaces/IPayload";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router : Router, private injector : Injector) { }

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
  extractPseudoFromPayload(token : string ) {
    if(token === null) {
      return null ;
    }
    const userObject :IPayload = this.injector.get(JSON.stringify(token));
    console.log("extractPseudo " +userObject.pseudo)
    return userObject.pseudo ;
  }

}
