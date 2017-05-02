import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSemanticModule } from "ng-semantic";
import { PlaylistPageComponent } from "./playlistpage.component";
import { PlaylistComponent } from "../../components/playlist/playlist/playlist.component";
import { PlaylistItemComponent } from "../../components/playlist/playlist-item/playlist-item.component";
import { PlaylistState} from "../../components/services/playlist-state.service";
import { SettingService} from "../../components/services/settings.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DataService } from "../../services/data.service";
import { SocketService } from "../../services/socket.service";
import { PipesModule } from "../../pipes";
 import { VirtualScrollModule } from "angular2-virtual-scroll";

@NgModule({
    imports: [ NgSemanticModule, CommonModule, ReactiveFormsModule, FormsModule, PipesModule, VirtualScrollModule ],
    providers: [ PlaylistState, DataService, SettingService, SocketService ],
    declarations: [ PlaylistItemComponent, PlaylistPageComponent, PlaylistComponent ],
    exports: [PlaylistPageComponent]
})

export class PlaylistPageModule { }