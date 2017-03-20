import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ScrollToDirective } from "./scrollTo.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ScrollToDirective
    ],
    exports: [
        ScrollToDirective
    ]
})
export class DirectivesModule {}
