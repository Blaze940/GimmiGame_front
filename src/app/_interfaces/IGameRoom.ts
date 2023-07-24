export interface IGameRoom {
    _id: string;
    roomName: string;
    currentGame: string;
    players: {
        _id: string;
        pseudo: string;
    }[];
    creator: {
        _id: string;
        pseudo: string;
    }
    maxPlayers: number;
}
