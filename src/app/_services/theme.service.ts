import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'appTheme';
  private readonly defaultTheme = 'dark';
  theme: BehaviorSubject<string> = new BehaviorSubject(this.defaultTheme);


  getTheme() : BehaviorSubject<string> {
    return this.theme;
  }

  setTheme(theme: string) : void {
    localStorage.setItem(this.themeKey, theme);
    this.theme.next(theme);
  }

  switch() : void {
    if(this.theme.getValue() == 'dark'){
      this.setTheme('light');
    }else{
      this.setTheme('dark');
    }
  }

}
