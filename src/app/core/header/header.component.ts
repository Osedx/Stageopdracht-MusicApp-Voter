import { Component, NgModule, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { CanActivateLoginViaAuthGuard } from "../../providers/login-activate.guard";
import { CanActivateAdminViaAuthGuard } from "../../providers/admin-activate.guard";
import { DataService } from "../../services/data.service";

// Provider
import {AF} from "../../providers/af";

@Component({
    selector: "my-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent implements OnInit {
    private district01 = /.*@district01.be/;
    public user : string;
    public allowed : boolean;

constructor(public afService : AF, private router : Router, private dataService : DataService,
            private canActivateLoginViaAuthGuard : CanActivateLoginViaAuthGuard,
            private canActivateAdminViaAuthGuard : CanActivateAdminViaAuthGuard) {}

ngOnInit() {
    this.afService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
        this.canActivateLoginViaAuthGuard.isLoggedIn = false;
        this.router.navigate(["login"]);
        }
        else {
          this.allowed = true;
          // Set the Display Name and Email show it
          if (auth.google) {
            this.afService.displayName = auth.auth.displayName;
            this.afService.email = auth.auth.email;
            this.afService.uid = auth.auth.uid;
            this.afService.changeId.next(this.afService.uid);
            this.user = this.afService.displayName.split(" ", 1)[0];
            if (!this.district01.test(auth.auth.email)) this.allowed = false;
          }
          else {
            this.afService.displayName = auth.auth.displayName;
            if (this.afService.displayName) {
                this.user = this.afService.displayName.split(" ", 1)[0];
            }
            else {
              this.user = "Anonymous";
            }
            this.afService.email = auth.auth.email;
            this.afService.uid = auth.auth.uid;
            this.afService.changeId.next(this.afService.uid);
            }
            if (this.allowed) {
            const comp = this;
            auth.auth.getToken(true).then(function(idToken) {
                comp.getUser(idToken);
                comp.afService.tokenId = idToken;
                }).catch(function(error) {
                console.log(error);
            });
            this.canActivateLoginViaAuthGuard.isLoggedIn = true;
            }
        }
        }
        );
    }
    // get user from database with role
    getUser(idToken : string) {
        this.dataService.getUser(idToken).subscribe(
            data => {
                if (data.json() == null) this.addUser(idToken);
                else this.canActivateAdminViaAuthGuard.role = data.json().role; },
            error => {
            console.log(error); }
        );
    }
    addUser(idToken) {
        this.dataService.addUser({ "_id" : this.afService.uid, "name" : this.afService.displayName, "email" : this.afService.email }, idToken).subscribe(
            res => {
                this.canActivateAdminViaAuthGuard.role = res.json().role;
//                console.log("User successfully added to database.", "success");
          },
          error => console.log(error)
        );
    }
    // log the user out
    logout() {
        this.canActivateLoginViaAuthGuard.isLoggedIn = false;
        this.afService.logout();
    }
}
