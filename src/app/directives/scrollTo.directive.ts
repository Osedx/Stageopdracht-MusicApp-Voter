import { Directive, Input, HostListener } from "@angular/core";

import * as $ from "jquery";

@Directive({
    selector: "[scrollTo]"
})
export class ScrollToDirective {

    constructor() {}

    @Input() scrollTo : string;
    @Input() scrollToOffset : number;

    @HostListener("click") onClick() {
        // Check if target is specified.
        if (!this.scrollTo) {
            return;
        }

        let target = $(this.scrollTo);

        // Check if target exits.
        if (!target.length) {
            return;
        }

        $("html, body").animate({
            scrollTop: target.offset().top - (this.scrollToOffset || 0)
        });
    }
}
