import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../_services/theme.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isDarkTheme: boolean = true;
  constructor(public themeService : ThemeService) {}

  ngOnInit(): void {}

  switchTheme() {
    this.themeService.switch();
    this.isDarkTheme = !this.isDarkTheme;
  }

}
