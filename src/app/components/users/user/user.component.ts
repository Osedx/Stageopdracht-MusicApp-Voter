import { Component, Input, OnInit } from "@angular/core";
import { User } from "../../models/user.model";
import { UserlistComponent } from "../userlist/userlist.component";
import { DataService } from "../../../services/data.service";
import { SocketService } from "../../../services/socket.service";
import { AF } from "../../../providers/af";
import { UserListState } from "../../services/userlist-state.service";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ["user.component.scss"]
})
export class UserComponent implements OnInit {
    @Input() user : User;
    @Input() index : number;
    isAdmin = false;
    isBlocked : boolean;
    constructor( private dataService : DataService, private socketService : SocketService, private afService : AF, private userlistState : UserListState ) {}
    ngOnInit() {
    if (this.user.role === "admin") this.isAdmin = true;
    this.getUserStatus();
    }
    getUserStatus() {
        this.dataService.getUserStatus(this.afService.tokenId, this.user._id).subscribe(
            data => {
            this.isBlocked = data;  },
    error => { console.log(error); } ); }
    removeUser() {
        this.dataService.deleteUser(this.afService.tokenId, this.user._id).subscribe(
            res => {
                this.userlistState.userList.splice(this.index, 1);
                console.log("User succesfully deleted.", "success");
                },
                error => { console.log(error); }
        );
    }
    updateUser(event : Event, name : string, role : string) {
        event.preventDefault();
        this.dataService.updateUser(this.afService.tokenId, {"_id" : this.user._id, "name" : name, "role" : role, "email" : this.user.email}).subscribe(
                    res => {
//                        this.userlistState.userList[this.index] = res.json();
                        this.user.name = name;
                        this.user.role = role;
                        if (this.user.role === "admin") this.isAdmin = true;
                        else {this.isAdmin = false; }
                        },
                    error => {
                    console.log("failed to update user");
                    }
        );
    }
    updateUserStatus() {
        this.isBlocked = !this.isBlocked;
        this.dataService.updateUserStatus(this.afService.tokenId, {"_id" : this.user._id, "disabled" : this.isBlocked}).subscribe(
                    res => {
                        console.log(this.isBlocked);
                        },
                    error => { console.log(error); }
        );
    }
}