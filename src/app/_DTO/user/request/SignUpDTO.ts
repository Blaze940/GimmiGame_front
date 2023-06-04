export class SignUpDTO {

  pseudo: string = "";

  email: string = "";

  password: string = "";

  constructor(pseudo: string, email: string, password: string){
    this.pseudo = pseudo;
    this.email = email;
    this.password = password;
  }

}
