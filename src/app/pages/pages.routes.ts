import { RouterModule, Routes, UrlSegment } from "@angular/router";

import { PlaylistPageComponent }  from "./playlist/playlistpage.component";
import { PersonalComponent }  from "./personal/personal.component";
import { AddComponent }  from "./add/add.component";
import { LoginComponent }  from "./login/login.component";

let pagesRoutes : Routes = [
    { path : "", component : PlaylistPageComponent },
    { path : "playlist", redirectTo : "" },
    { path : "personal", component : PersonalComponent },
    { path : "add", component : AddComponent },
    { path : "login", component : LoginComponent }
];

export const PagesRoutes = RouterModule.forRoot(pagesRoutes);