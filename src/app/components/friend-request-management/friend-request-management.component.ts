import { Component, OnInit } from '@angular/core';
import {IFriendRequest} from "../../_interfaces/IFriendRequest";

@Component({
  selector: 'app-friend-request-management',
  templateUrl: './friend-request-management.component.html',
  styleUrls: ['./friend-request-management.component.css']
})
export class FriendRequestManagementComponent implements OnInit {
  arrayFriendRequest : IFriendRequest [] = []
  arrayRequestsSent : IFriendRequest [] = [];
  constructor() { }

  ngOnInit(): void {
  }



}
