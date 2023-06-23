import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../../_services/theme.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {

  currentTheme : BehaviorSubject<string> = new BehaviorSubject<string>("dark")
  constructor(private themeService : ThemeService) { }

  ngOnInit(): void {
    this.themeService.getTheme().subscribe(theme => {
      this.currentTheme.next(theme);
    });
  }


}
