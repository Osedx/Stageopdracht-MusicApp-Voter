import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataService } from "../../services/data.service";
import { VideolistPageComponent } from "./videolistpage.component";
import { VideolistComponent } from "../../components/videolist/videolist/videolist.component";
import { VideoComponent } from "../../components/videolist/video/video.component";
import { PipesModule } from "../../pipes";

@NgModule({
    imports: [ CommonModule, PipesModule ],
    providers: [ DataService ],
    declarations: [ VideolistPageComponent, VideolistComponent, VideoComponent ],
    exports: [ VideolistPageComponent ]
})

export class VideolistPageModule { }