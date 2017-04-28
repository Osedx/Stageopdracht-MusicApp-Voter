import { Component, OnInit } from "@angular/core";
import {AF} from "../../providers/af";
import { CanActivateLoginViaAuthGuard } from "../../providers/login-activate.guard";

import {Router} from "@angular/router";
import "rxjs/add/operator/catch";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  showError = false;
  errorMessage : String;
  message : string;
  messageSuccess = false;
  showErrorEmail = false;
  public error : any;
  public clickedLogin = false;

constructor(public afService : AF, private router : Router, private canActivateLoginViaAuthGuard : CanActivateLoginViaAuthGuard) {}
  loginWithGoogle() {
    this.afService.loginWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in
    let district01 = /.*@district01.be/;
    if (district01.test(data.auth.email)) {
        this.router.navigate([""]);
    }
    else {
        this.canActivateLoginViaAuthGuard.isLoggedIn = false;
        this.afService.logout();
        this.showError = true;
        this.errorMessage = "Only District01 accounts allowed with Google login, please ask an Administrator to add an account for you.";
    }
    });
  }

   loginWithEmail(event : Event, email : string, password : string) {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      // Send them to the homepage if they are logged in
      this.router.navigate([""]);
    })
      .catch((error) => {
          this.error = error;
          this.showError = true;
          this.showErrorEmail = true;
          this.errorMessage = error.message;
      });
  }
    resetPassword(event : Event, email : string) {
        event.preventDefault();
        this.afService.sendReset(email).then(() => {
          // Send them to the homepage if they are logged in
        this.message = "E-mail successfully send!";
        this.messageSuccess = true;
        }).catch((error) => {
          this.error = error;
          this.showError = true;
          this.errorMessage = error.message;
      });
    }
    clickLogin() {
        this.clickedLogin = true;
    }
    closeSuccess() {
        this.messageSuccess = false;
    }
    closeFailed() {
        this.showError = false;
        this.showErrorEmail = false;
    }
}