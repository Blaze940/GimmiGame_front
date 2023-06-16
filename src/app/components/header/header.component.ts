import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../_services/theme.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public themeService : ThemeService) {}

  ngOnInit(): void {}


}
