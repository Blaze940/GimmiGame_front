
export class AuthCredentialsDTO{
  pseudo: string = "";
  password: string = "";

  constructor(pseudo: string, password: string){
    this.pseudo = pseudo;
    this.password = password;
  }
}
