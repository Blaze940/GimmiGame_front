export interface IFriendRequest {
  _id: string,
  from: {
    _id: string,
    pseudo: string,
  }
  to: {
    _id: string,
    pseudo: string,
  }
  sendingDate: string,
  status: string
}
