import { Component, OnInit } from '@angular/core';
import { ThemeService } from "./_services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GimmiFront';
  theme: string = 'dark';

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme(localStorage.getItem('appTheme') || 'dark');
    this.themeService.getTheme().subscribe((theme) => {
      this.theme = theme;
    });
  }
}
