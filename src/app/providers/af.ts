// src/app/providers/af.ts
import { Injectable, Inject } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseApp  } from "angularfire2";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AF {
  private auth : any;
  public displayName : string;
  public email : string;
  public uid : string;
  public tokenId : string;
  public changeId : Subject<string> = new Subject<string>();
  constructor(public af : AngularFire, @Inject(FirebaseApp) fa : any) {
    this.auth = fa.auth();
  }

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
    sendReset(email) {
    return this.auth.sendPasswordResetEmail(email);
    }

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }
}