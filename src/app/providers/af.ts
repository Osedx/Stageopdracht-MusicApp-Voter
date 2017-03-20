// src/app/providers/af.ts
import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods } from "angularfire2";
import { Subject }    from "rxjs/Subject";

@Injectable()
export class AF {
  public displayName : string;
  public email : string;
  public uid : string;
  public changeId : Subject<string> = new Subject<string>();
  constructor(public af : AngularFire) {}

  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }
   loginWithEmail(email : string, password : string) {
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }
}