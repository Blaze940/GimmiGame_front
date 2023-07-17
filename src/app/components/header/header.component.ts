import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ThemeService} from "../../_services/theme.service";
import {UserService} from "../../_services/user.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  currentUserPseudo : string | null = null;
  isDarkTheme: boolean = true;
  isLogged: boolean = false;
  constructor(public themeService : ThemeService, private userService : UserService, private changeDetectorRef : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setLoggedUser();
    this.setPseudo();
  }

  switchTheme() {
    this.themeService.switch();
    this.isDarkTheme = !this.isDarkTheme;
  }

  setLoggedUser() : void {
    this.isLogged = this.userService.isLogged();
    this.changeDetectorRef.detectChanges();
  }

  setPseudo(): void {
    if (this.isLogged) {
      // Vérification si l'utilisateur est connecté
      this.currentUserPseudo = this.userService.getCurrentUserPseudo();
    }
  }

  logout() : void {
    this.userService.logout();
    this.setLoggedUser();
  }

}
