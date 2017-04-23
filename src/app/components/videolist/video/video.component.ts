import { Component, Input } from "@angular/core";
import { Playlist } from "../../models/playlist.model";
// import { VideolistComponent } from "../videolist/videolist.component";
import { DataService } from "../../../services/data.service";
import { SocketService } from "../../../services/socket.service";
import { PlaylistState } from "../../services/playlist-state.service";

@Component({
  selector: "app-video",
  templateUrl: "video.component.html",
  styleUrls: ["video.component.scss"]
})
export class VideoComponent {
    @Input() playlistitem : Playlist;
    @Input() index : number;

    constructor( private dataService : DataService, private socketService : SocketService,
    private playlistState : PlaylistState) {}

    deletePlaylistItem() {
        this.dataService.deletePlaylistItem(this.playlistitem._id).subscribe (
            res => { this.playlistState.playList.splice(this.index, 1);
                this.socketService.socket.emit("deletefromplaylist", this.playlistitem._id);
                console.log("personal video succesfully deleted from database.", "success"); },
                error => { console.log(error); }
              );
        }
}