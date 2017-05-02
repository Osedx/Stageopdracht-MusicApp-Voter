import { HttpModule, Http, Response } from "@angular/http";
import { CoreModule } from "./core";
import { enableProdMode, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule }  from "@angular/platform-browser";

import { Observable } from "rxjs/Observable";

import { PagesModule } from "./pages";
// import { ComponentsModule } from "./components";
import { DirectivesModule } from "./directives";
import { PipesModule } from "./pipes";
import { AppComponent } from "./app.component";
import { APP_CONFIG, AppConfig } from "./app.config";

@NgModule({
    imports: [
        CoreModule,
        BrowserModule,
        CommonModule,
        HttpModule,
        PagesModule,
        // ComponentsModule,
        DirectivesModule,
        PipesModule,
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: APP_CONFIG, useValue: AppConfig }
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }