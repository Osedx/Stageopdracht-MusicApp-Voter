import { RouterModule, Routes, UrlSegment } from "@angular/router";

import { PlaylistPageComponent }  from "./playlist/playlistpage.component";
import { PersonalComponent }  from "./personal/personal.component";
import { AddComponent }  from "./add/add.component";
import { LoginComponent }  from "./login/login.component";
import { VideolistPageComponent }  from "./videos/videolistpage.component";
import { UserlistPageComponent }  from "./users/userlistpage.component";
import { CanActivateAdminViaAuthGuard } from "../providers/admin-activate.guard";
import { CanActivateLoginViaAuthGuard } from "../providers/login-activate.guard";
import { NoContentComponent } from "./no-content/no-content.component";

let pagesRoutes : Routes = [
    { path : "playlist", component : PlaylistPageComponent,
    canActivate: [ CanActivateLoginViaAuthGuard ] },
    { path : "personal", component : PersonalComponent,
    canActivate: [ CanActivateLoginViaAuthGuard ] },
    { path : "add", component : AddComponent,
    canActivate: [ CanActivateLoginViaAuthGuard ] },
    { path : "login", component : LoginComponent },
    { path : "videos", component : VideolistPageComponent,
    canActivate: [ CanActivateLoginViaAuthGuard,  CanActivateAdminViaAuthGuard] },
    { path : "users", component : UserlistPageComponent,
    canActivate: [ CanActivateLoginViaAuthGuard,  CanActivateAdminViaAuthGuard] },
    { path : "", pathMatch: "full", redirectTo : "playlist"},
    { path : "**", component : NoContentComponent },
];

export const PagesRoutes = RouterModule.forRoot(pagesRoutes);