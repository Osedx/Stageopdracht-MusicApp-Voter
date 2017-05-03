import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSemanticModule } from "ng-semantic";
import { AddComponent} from "./add.component";
import { SearchbarComponent } from "../../components/search/searchbar/searchbar.component";
import { VideoListComponent } from "../../components/search/videolist/videolist.component";
import { VideoListItemComponent } from "../../components/search/videolist-item/videolist-item.component";
import { VideoListState} from "../../components/services/videolist-state.service";
import { SearchService } from "../../components/services/search.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// import { YoutubeSafeUrlPipe } from "../../pipes/youtube-safe-url.pipe";
import { DataService } from "../../services/data.service";
import { PipesModule } from "../../pipes";
import { SocketService } from "../../services/socket.service";

@NgModule({
    imports: [ NgSemanticModule, CommonModule, ReactiveFormsModule, FormsModule, PipesModule ],
    providers: [ VideoListState, DataService,  SearchService, SocketService ],
    declarations: [ AddComponent, SearchbarComponent, VideoListComponent, VideoListItemComponent ],
    exports: [AddComponent]
})

export class AddModule { }