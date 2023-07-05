import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {UserAPIService} from "./callAPI/userAPI.service";
import {IToken} from "../_interfaces/IToken";
import {FormGroup} from "@angular/forms";
import {ISignIn} from "../_interfaces/ISignIn";
import {ISignUp} from "../_interfaces/ISignUp";
import {IRequestUser} from "../_interfaces/IRequestUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //isCurrentUserOnline : boolean = false ;
  //currentUserPseudo : string | null = "test" ;

  constructor(private router : Router, private http: HttpClient, private tokenService : TokenService, private userAPIService : UserAPIService) { }

  //loadCurrentUser()

  async logout() : Promise<void> {
    const userToken : string | null = this.tokenService.getCurrentUserToken() ;

    try {
      if (userToken !== null) {
        const currentUserPseudo = this.getCurrentUserPseudo();
        await this.userAPIService.signOut(currentUserPseudo!).toPromise();
      }

      this.tokenService.clearStorage();
      // INUTILE ? this.isCurrentUserOnline = false;
      this.router.navigate(['/']).then(() => {
        window.location.href = '/?refresh=true';
      });

    }catch (e) {
      return Promise.reject(e);
    }

  }

  async login(loginForm : ISignIn) : Promise<void> {

    try{
      const userToken : IToken | undefined = await this.userAPIService.signIn(loginForm).toPromise();

      if(userToken === undefined) {
        return Promise.reject('Token is undefined');
      }

      this.tokenService.saveToken(userToken.token);
      //INUTILE ? this.isCurrentUserOnline = true ;
      //console.log("TEST : " + this.getCurrentUserPseudo())

    }catch (e) {
      return Promise.reject(e);
    }
  }

  async register(registerForm : ISignUp) : Promise<void> {
      try{
        const userToken : IToken | undefined = await this.userAPIService.signUp(registerForm).toPromise();

        if(userToken === undefined) {
          return Promise.reject('Token is undefined');
        }

        this.tokenService.saveToken(userToken.token);
        // INUTILE ? this.isCurrentUserOnline = true ;
        //console.log("TEST : " + this.getCurrentUserPseudo())

      }catch (e) {
        return Promise.reject(e);
      }
  }

  async getUserByPseudo(pseudo: string): Promise<IRequestUser | null> {
    try {
      const user: IRequestUser | undefined = await this.userAPIService.getOneByPseudo(pseudo).toPromise();
      if (user === undefined) {
        return null;
      }
      return user;
    } catch (e) {
      return null;
    }

  }

  getCurrentUserPseudo() : string | null {
    const userToken : string | null = this.tokenService.getCurrentUserToken() ;
    if(userToken !== null) {
      return this.tokenService.extractPseudoFromPayload(userToken);
    }
    return null;
  }

  isLogged() : boolean {
    return this.tokenService.isLogged()
  }


}
