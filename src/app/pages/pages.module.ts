import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { VideolistPageModule }  from "./videos/videolistpage.module";

// import { ComponentsModule } from "../components";
import { DirectivesModule } from "../directives";
import { PipesModule } from "../pipes";

import { PersonalModule } from "./personal/personal.module";
import { AddModule } from "./add/add.module";
import { LoginComponent} from "./login/login.component";
import { PlaylistPageModule } from "./playlist/playlistpage.module";
import { UserlistPageModule } from "./users/userlistpage.module";

import { PagesRoutingModule } from "./pages.routing.module";

// FireBase authentication
import { AngularFireModule } from "angularfire2";
import {AF} from "../providers/af";

import { NgSemanticModule } from "ng-semantic";

import { CanActivateAdminViaAuthGuard } from "../providers/admin-activate.guard";
import { CanActivateLoginViaAuthGuard } from "../providers/login-activate.guard";

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyAfaYe3oXq9-zwqZElMuFV9iwwIaduRU0A",
    authDomain: "district01-musicapp.firebaseapp.com",
    databaseURL: "https://district01-musicapp.firebaseio.com",
    storageBucket: "district01-musicapp.appspot.com",
    messagingSenderId: "365848876558"
};

@NgModule({
    imports: [
        NgSemanticModule,
        PlaylistPageModule,
        AddModule,
        PersonalModule,
        CommonModule,
        HttpModule,
        PagesRoutingModule,
        VideolistPageModule,
        UserlistPageModule,
        AngularFireModule.initializeApp(firebaseConfig),

//        ComponentsModule,
        DirectivesModule,
        PipesModule
    ],
    declarations: [
        LoginComponent,
    ],
    providers: [AF, CanActivateLoginViaAuthGuard, CanActivateAdminViaAuthGuard],
    exports: [
        RouterModule
    ]
})

export class PagesModule {
}
