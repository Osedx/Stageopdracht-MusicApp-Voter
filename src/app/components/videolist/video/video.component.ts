import { Component, Input, OnInit } from "@angular/core";
import { Playlist } from "../../models/playlist.model";
// import { VideolistComponent } from "../videolist/videolist.component";
import { DataService } from "../../../services/data.service";
import { SocketService } from "../../../services/socket.service";
import { PlaylistState } from "../../services/playlist-state.service";
import { AF } from "../../../providers/af";

@Component({
  selector: "app-video",
  templateUrl: "video.component.html",
  styleUrls: ["video.component.scss"]
})
export class VideoComponent implements OnInit {
    @Input() playlistitem : Playlist;
    @Input() index : number;
//    index : number;
    isDeleted : boolean = false;

    constructor( private dataService : DataService, private socketService : SocketService,
    private playlistState : PlaylistState, private afService : AF) {}

    ngOnInit() {
//        this.index = this.playlistState.playList.indexOf(this.playlistitem);
    }

    deletePlaylistItem() {
        this.dataService.deletePlaylistItem(this.playlistitem._id).subscribe (
            res => {
                this.playlistState.playList.splice(this.index, 1);
                this.isDeleted = true;
                this.socketService.socket.emit("deletefromplaylist", this.playlistitem._id);
//                console.log("personal video succesfully deleted from database.", "success");
            }, error => { console.log(error); }
              );
        }
}