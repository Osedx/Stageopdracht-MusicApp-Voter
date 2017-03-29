import { Component, ElementRef, EventEmitter, Renderer } from "@angular/core";
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError }  from "@angular/router";

// import "../../bower_components/jquery/dist/jquery.min.js";
// import "../../bower_components/semantic/dist/semantic.min.js";
import "../../public/assets/scss/styles.scss";

@Component({
    selector: "body",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})

export class AppComponent {
    public isOverlayEnabled : boolean = false;
    public isRouterChanging : boolean = false;

    constructor(
        private _router : Router,
        private _element : ElementRef,
        private _renderer : Renderer
    ) {}

    ngOnInit() {
        this._router.events
            .subscribe((evt) => {
                if (evt instanceof NavigationEnd) {
                    document.body.scrollTop = 0;
                    this.isRouterChanging = false;
                } else if (evt instanceof NavigationStart) {
                    this.isRouterChanging = true;
                } else if (evt instanceof NavigationCancel) {
                    this.isRouterChanging = false;
                } else if (evt instanceof NavigationError) {
                    this.isRouterChanging = false;
                }
            });
    }
}
