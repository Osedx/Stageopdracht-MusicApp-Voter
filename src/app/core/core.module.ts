import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { enableProdMode } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CanActivateAdminViaAuthGuard } from "../providers/admin-activate.guard";
import { CanActivateLoginViaAuthGuard } from "../providers/login-activate.guard";
import { DataService } from "../services/data.service";

// import { ComponentsModule } from "../components";
import { DirectivesModule } from "../directives";
import { NgSemanticModule } from "ng-semantic";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
    imports: [
        NgSemanticModule,
        RouterModule,
        CommonModule,
        HttpModule,
        FormsModule,
//        ComponentsModule,
        DirectivesModule
    ],
    providers: [
        CanActivateAdminViaAuthGuard,
        CanActivateLoginViaAuthGuard,
        DataService
    ],
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ]
})

export class CoreModule {}
