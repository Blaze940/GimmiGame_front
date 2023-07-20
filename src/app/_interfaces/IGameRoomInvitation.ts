export interface IGameRoomInvitation {
    _id: string
    gameRoom: {
        _id: string;
        roomName: string;
    }
    from: {
        _id: string;
        pseudo: string;
    }
    to: {
        _id: string;
        pseudo: string;
    }
    status: string;
}
