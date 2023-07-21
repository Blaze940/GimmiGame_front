//Type of values that we get from the database after populate
import {IUser} from "./IUser";

export interface IFriendList {
  _id: string,
  owner: string,
  friends: IUser[]
}
