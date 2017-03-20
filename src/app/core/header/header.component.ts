import { Component, NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";

// Provider
import {AF} from "../../providers/af";

@Component({
    selector: "my-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {
    public isLoggedIn : boolean;
    public user : string;

  constructor(public afService : AF, private router : Router) {
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
    this.afService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Niet ingelogd.");
          this.router.navigate(["login"]);
          this.isLoggedIn = false;
        }
        else {
          console.log("Succesvol ingelogd.");
          // Set the Display Name and Email show it
          if (auth.google) {
        console.log(auth.auth.displayName);
            this.afService.displayName = auth.auth.displayName;
            this.afService.email = auth.auth.email;
            this.afService.uid = auth.auth.uid;
            this.afService.changeId.next(this.afService.uid);
            console.log(auth.auth);
            this.user = this.afService.displayName.split(" ", 1)[0];
              console.log(this.user);
          }
          else {
            this.user = "Gebruiker";
            this.afService.displayName = auth.auth.displayName;
            this.afService.email = auth.auth.email;
            this.afService.uid = auth.auth.uid;
            this.afService.changeId.next(this.afService.uid);
          }
          this.isLoggedIn = true;
          this.router.navigate([""]);
        }
        }
        );
    }
      logout() {
        this.isLoggedIn = false;
        this.afService.logout();
      }
}