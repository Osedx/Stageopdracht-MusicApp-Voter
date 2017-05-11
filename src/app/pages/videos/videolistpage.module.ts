import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataService } from "../../services/data.service";
import { VideolistPageComponent } from "./videolistpage.component";
import { VideolistComponent } from "../../components/videolist/videolist/videolist.component";
import { VideoComponent } from "../../components/videolist/video/video.component";
import { PipesModule } from "../../pipes";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgSemanticModule } from "ng-semantic";

// import { VirtualScrollModule } from "angular2-virtual-scroll";

@NgModule({
    imports: [ CommonModule, PipesModule, ReactiveFormsModule, FormsModule, NgSemanticModule ],
    providers: [ DataService ],
    declarations: [ VideolistPageComponent, VideolistComponent, VideoComponent ],
    exports: [ VideolistPageComponent ]
})

export class VideolistPageModule { }