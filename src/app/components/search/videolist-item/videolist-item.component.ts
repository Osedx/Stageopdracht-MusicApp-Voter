import { Component, Input } from "@angular/core";
import { Video } from "../../models/video.model";
import { VideoListState } from "../../services/videolist-state.service";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { VideoListComponent} from "../videolist/videolist.component";
import { NgSemanticModule } from "ng-semantic";
import { DataService } from "../../../services/data.service";
import { SocketService } from "../../../services/socket.service";
import { AF } from "../../../providers/af";

@Component({
  selector: "app-videolist-item",
  templateUrl: "videolist-item.component.html",
  styleUrls: ["videolist-item.component.scss"]
})
export class VideoListItemComponent {
    clicked : boolean;
    @Input() video : Video;
    @Input() modal : NgSemanticModule;
constructor(private videoListState : VideoListState, private dataService : DataService,
private afService : AF, private socketService : SocketService ) {}
    add() {
        this.clicked = true;
       this.dataService.addPlaylistItem({"_id" : this.video.videoId, "title" : this.video.title, "thumbnailurl" : this.video.thumbnailUrl, "channeltitle" : this.video.channelTitle, "channelid" : this.video.channelId, "description" : this.video.description, "uploader" : this.afService.displayName, "uploaderid" : this.afService.uid, "rating" : 0 }).subscribe(
        res => {
//            console.log( res.json() );
            this.socketService.socket.emit("updateplaylist", this.afService.uid);
            const newPlaylistItem = res.json();
//            console.log(newPlaylistItem + "added successfully to database.", "success");
      },
      error => console.log(error)
    );
    }
    onClickThumb() {
    this.videoListState.activeVideo = this.video;
    this.videoListState.isPlaying = true;
//    console.log(this.videoListState.activeVideo);
  }
}