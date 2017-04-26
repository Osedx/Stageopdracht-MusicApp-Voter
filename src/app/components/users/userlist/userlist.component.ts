import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { AF } from "../../../providers/af";
import { NgSemanticModule } from "ng-semantic";
import { UserListState } from "../../services/userlist-state.service";

@Component({
  selector: "app-userlist",
  templateUrl: "userlist.component.html",
  styleUrls: ["userlist.component.scss"]
})
export class UserlistComponent implements OnInit {
//    messageSuccess = false;
    messageFailed = false;
    message : string;
    @ViewChild("name") name : ElementRef;
    @ViewChild("email") email : ElementRef;
    @ViewChild("password") password : ElementRef;
constructor( private dataservice : DataService, private afService : AF, private userlistState : UserListState ) {
    this.getAllUsers();
}
    ngOnInit() {
    }
    getAllUsers() {
        this.dataservice.getAllUsers(this.afService.tokenId).subscribe(
            data => {
            this.userlistState.userList = data;
//            console.log("Users " + data);
            },
    error => { console.log(error); } ); }

    addUser(event : Event, name : string, email : string, password : string) {
        event.preventDefault();
//        this.messageSuccess = false;
        this.messageFailed = false;
        if (password.length >= 6) {
            this.name.nativeElement.value = "";
            this.email.nativeElement.value = "";
            this.password.nativeElement.value = "";
            this.addUserToFirebase(this.afService.tokenId, name, email, password);
        }
        else {
          this.message = "Password must have atleast 6 characters";
          this.messageFailed = true;
        }
    }
    addUserToFirebase(tokenId, name, email, password) {
        this.dataservice.addUserToFirebase({"id" : tokenId, "name" : name, "email" : email, "password" : password}).subscribe(
            res => {
//                this.message = "User is successfully added.";
//                this.messageSuccess = true;
                this.userlistState.userList.push(res.json());
        },
            error => {
                this.message = "Failed to add user.";
                this.messageFailed = true;
            }
        );
    }

    closeSuccess() {
//        this.messageSuccess = false;
    }

    closeFailed() {
        this.messageFailed = false;
    }
}