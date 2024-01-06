import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css'],
})
export class LandpageComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  isLogged(): boolean {
    return this.userService.isLogged();
  }
}
