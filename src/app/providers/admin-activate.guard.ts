import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable()
export class CanActivateAdminViaAuthGuard implements CanActivate {
  role : string;
  canActivate() {
    if (typeof this.role === "undefined") return false;
    return this.role === "admin";
  }
}