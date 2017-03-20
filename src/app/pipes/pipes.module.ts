import { NgModule } from "@angular/core";

import { FilesizePipe } from "./filesize.pipe";
import { SafeDatePipe } from "./safeDate.pipe";
import { CapitalizePipe } from "./capitalize.pipe";
import { YoutubeSafeUrlPipe } from "./youtube-safe-url.pipe";
import { AbsoluteValuePipe } from "./absoluteValue.pipe";

@NgModule({
    imports: [],
    declarations: [
        FilesizePipe,
        SafeDatePipe,
        CapitalizePipe,
        YoutubeSafeUrlPipe,
        AbsoluteValuePipe
    ],
    providers: [
        FilesizePipe,
        SafeDatePipe,
        CapitalizePipe,
        YoutubeSafeUrlPipe,
        AbsoluteValuePipe
    ],
    exports: [
        FilesizePipe,
        SafeDatePipe,
        CapitalizePipe,
        YoutubeSafeUrlPipe,
        AbsoluteValuePipe
    ]
})

export class PipesModule { }