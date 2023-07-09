import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../../_services/theme.service";
import {BehaviorSubject} from "rxjs";
import {UserService} from "../../../_services/user.service";

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {
  currentSection : string = "invitations";
  currentUserPseudo : string | null = null;

  currentTheme : BehaviorSubject<string> = new BehaviorSubject<string>("dark")
  constructor(private themeService : ThemeService, private userService : UserService) { }

  ngOnInit(): void {
    this.themeService.getTheme().subscribe(theme => {
      this.currentTheme.next(theme);
    });
    this.initOwner();
  }

  initOwner(){
    this.currentUserPseudo = this.userService.getCurrentUserPseudo();
  }


}
