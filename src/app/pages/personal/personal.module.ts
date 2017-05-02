import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSemanticModule } from "ng-semantic";
import { PersonalComponent } from "./personal.component";
import { PersonalVideoListComponent } from "../../components/personalvideos/personalvideolist/personalvideolist.component";
import { PersonalVideoComponent } from "../../components/personalvideos/personalvideo/personalvideo.component";
import { PlaylistState} from "../../components/services/playlist-state.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DataService } from "../../services/data.service";
import { PipesModule } from "../../pipes";
import { VirtualScrollModule } from "angular2-virtual-scroll";

@NgModule({
    imports: [ NgSemanticModule, CommonModule, ReactiveFormsModule, FormsModule, PipesModule, VirtualScrollModule ],
    providers: [ PlaylistState, DataService ],
    declarations: [ PersonalVideoListComponent, PersonalComponent, PersonalVideoComponent ],
    exports: [ PersonalComponent ]
})

export class PersonalModule { }