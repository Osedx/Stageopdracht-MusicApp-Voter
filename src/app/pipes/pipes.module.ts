import { NgModule } from "@angular/core";

import { FilesizePipe } from "./filesize.pipe";
import { SafeDatePipe } from "./safeDate.pipe";
import { CapitalizePipe } from "./capitalize.pipe";
import { YoutubeSafeUrlPipe } from "./youtube-safe-url.pipe";
import { AbsoluteValuePipe } from "./absoluteValue.pipe";
import { MyFilterPipe } from "./myfilter.pipe";
import { OrderBy } from "./orderby.pipe";
import { MyUserFilterPipe } from "./myuserfilter.pipe";

@NgModule({
    imports: [],
    declarations: [
        FilesizePipe,
        SafeDatePipe,
        CapitalizePipe,
        YoutubeSafeUrlPipe,
        AbsoluteValuePipe,
        MyFilterPipe,
        MyUserFilterPipe,
        OrderBy
    ],
    providers: [
        FilesizePipe,
        SafeDatePipe,
        CapitalizePipe,
        YoutubeSafeUrlPipe,
        AbsoluteValuePipe,
        MyFilterPipe,
        MyUserFilterPipe,
        OrderBy
    ],
    exports: [
        FilesizePipe,
        SafeDatePipe,
        CapitalizePipe,
        YoutubeSafeUrlPipe,
        AbsoluteValuePipe,
        MyFilterPipe,
        MyUserFilterPipe,
        OrderBy
    ]
})

export class PipesModule { }