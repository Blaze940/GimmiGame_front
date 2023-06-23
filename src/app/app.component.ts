import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ThemeService } from "./_services/theme.service";
import {UserService} from "./_services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GimmiFront';
  theme: string = 'dark';
  isLogged: boolean = false;

  constructor(public themeService: ThemeService, private userService : UserService, private changeDetectorRef : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setLoggedUser();
    this.themeService.setTheme(localStorage.getItem('appTheme') || 'dark');
    this.themeService.getTheme().subscribe((theme) => {
      this.theme = theme;
    });
  }

  setLoggedUser() : void {
    this.isLogged = this.userService.isLogged();
    this.changeDetectorRef.detectChanges();
  }


}
