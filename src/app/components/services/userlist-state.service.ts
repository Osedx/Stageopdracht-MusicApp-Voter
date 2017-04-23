import { Injectable } from "@angular/core";
import { User } from "../models/user.model";


@Injectable()
export class UserListState {
    userList : User[] = [];
  constructor() {
  }

}
