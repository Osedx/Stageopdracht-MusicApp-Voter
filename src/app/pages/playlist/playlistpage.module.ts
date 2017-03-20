import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSemanticModule } from "ng-semantic";
import { PlaylistPageComponent } from "./playlistpage.component";
import { PlaylistComponent } from "../../components/playlist/playlist/playlist.component";
import { PlaylistItemComponent } from "../../components/playlist/playlist-item/playlist-item.component";
import { PlaylistState} from "../../components/services/playlist-state.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DataService } from "../../services/data.service";
import { PipesModule } from "../../pipes";

@NgModule({
    imports: [ NgSemanticModule, CommonModule, ReactiveFormsModule, FormsModule, PipesModule ],
    providers: [ PlaylistState, DataService ],
    declarations: [ PlaylistItemComponent, PlaylistPageComponent, PlaylistComponent ],
    exports: [PlaylistPageComponent]
})

export class PlaylistPageModule { }