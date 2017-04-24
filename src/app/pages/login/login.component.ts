import { Component, OnInit } from "@angular/core";
import {AF} from "../../providers/af";

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
  public error : any;
  public clickedLogin = false;

constructor(public afService : AF, private router : Router) {}
  loginWithGoogle() {
    this.afService.loginWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in
      let district01 = /.*@district01.be/;
        console.log(district01.test(data.auth.email));
        this.router.navigate([""]);
    });
  }

   loginWithEmail(event : Event, email : string, password : string) {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      // Send them to the homepage if they are logged in
      console.log(email);
      this.router.navigate([""]);
    })
      .catch((error) => {
          this.error = error;
          this.showError = true;
          this.errorMessage = error.message;
//          this.errorMessage = "Incorrect password";
      });
  }
    resetPassword(event : Event, email : string) {
        event.preventDefault();
        this.afService.sendReset(email).then(() => {
          // Send them to the homepage if they are logged in
        this.message = "E-mail successfully send!";
        this.messageSuccess = true;
        });
    }
    clickLogin() {
        this.clickedLogin = true;
    }
    closeSuccess() {
        this.messageSuccess = false;
    }
}