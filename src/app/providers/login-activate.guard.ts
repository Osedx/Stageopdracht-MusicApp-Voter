import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable()
export class CanActivateLoginViaAuthGuard implements CanActivate {
    isLoggedIn : boolean;
    canActivate() {
    return this.isLoggedIn;
  }
}