export interface DisplayData {
  tag: string;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
  cx?: number;
  cy?: number;
  r?: number;
  fill?: string;
}

export interface ZoneData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RequestedAction {
  type: string;
  player: number;
  zones: ZoneData[];
}

export interface GameState {
  scores: number[];
  game_over: boolean;
}

export interface IDataFromServer {
  displays: {
    width: string;
    height: string;
    content: DisplayData[];
    player: number;
  }[];
  requested_actions: RequestedAction[];
  game_state: GameState;
}
