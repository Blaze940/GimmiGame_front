import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ThemeService} from "../../_services/theme.service";
import {UserService} from "../../_services/user.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isDarkTheme: boolean = true;
  isLogged: boolean = false;
  constructor(public themeService : ThemeService, private userService : UserService, private changeDetectorRef : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setLoggedUser();
  }

  switchTheme() {
    this.themeService.switch();
    this.isDarkTheme = !this.isDarkTheme;
  }

  // setPseudo() : void {
  //   this.userPseudo = this.userService.getCurrentUserPseudo();
  //   console.log("pseudo: " + this.userPseudo);
  // }

  setLoggedUser() : void {
    this.isLogged = this.userService.isLogged();
    this.changeDetectorRef.detectChanges();
  }

  logout() : void {
    this.userService.logout();
    this.setLoggedUser();
  }

}
