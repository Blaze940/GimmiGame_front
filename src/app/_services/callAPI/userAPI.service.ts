import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../../_interfaces/IUser";
import {ISignUp} from "../../_interfaces/ISignUp";
import {ISignIn} from "../../_interfaces/ISignIn";
import {IToken} from "../../_interfaces/IToken";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  base_URL: string = environment.API_URL + 'users/'

  constructor(private router: Router, private http: HttpClient) { }
  signUp(signUpForm: ISignUp): Observable<IToken> {
    return this.http.post<IToken>(this.base_URL + 'signup', signUpForm);
  }

  signIn(signInForm: ISignIn): Observable<IToken> {
    return this.http.post<IToken>(this.base_URL + 'signin', signInForm);
  }

  signOut(pseudo: string): Observable<void> {
    return this.http.patch<void>(this.base_URL + 'signout/' + pseudo, null);
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.base_URL+'all');
  }

  getOneByPseudo(pseudo: string | null): Observable<IUser> {
    return this.http.get<IUser>(this.base_URL + 'pseudo/' + pseudo);
  }

}
