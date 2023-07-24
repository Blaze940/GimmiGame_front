import { Component, OnInit } from '@angular/core';
import {players} from "../../_data_sample/players_ranking";

@Component({
  selector: 'app-friend-ranking',
  templateUrl: './friend-ranking.component.html',
  styleUrls: ['./friend-ranking.component.css']
})
export class FriendRankingComponent implements OnInit {

  players = players;

  constructor() { }

  ngOnInit(): void {
    this.sortPlayersByScore();
  }

  sortPlayersByScore(): void {
    this.players.sort((a, b) => b.score - a.score);
  }

}
