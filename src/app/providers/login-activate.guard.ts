import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable()
export class CanActivateLoginViaAuthGuard implements CanActivate {
    isLoggedIn : boolean = true;
    canActivate() {
    return this.isLoggedIn;
  }
}