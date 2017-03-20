import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { PagesRoutes } from "./pages.routes";

@NgModule({
    imports: [
        PagesRoutes
    ],
    exports: [
        RouterModule
    ]
})

export class PagesRoutingModule { }
