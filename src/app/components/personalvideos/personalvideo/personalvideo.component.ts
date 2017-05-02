import { Component, Input, OnInit } from "@angular/core";
import { Playlist } from "../../models/playlist.model";
import { PlaylistState } from "../../services/playlist-state.service";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { PersonalVideoListComponent } from "../personalvideolist/personalvideolist.component";
import { NgSemanticModule } from "ng-semantic";
import { DataService } from "../../../services/data.service";
import { SocketService } from "../../../services/socket.service";

@Component({
  selector: "app-personalvideo",
  templateUrl: "personalvideo.component.html",
  styleUrls: ["personalvideo.component.scss"]
})
export class PersonalVideoComponent implements OnInit {
    @Input() playlistitem : Playlist;
//    @Input() index : number;
    @Input() modal : NgSemanticModule;
    index : number;
    isDeleted : boolean = false;

    constructor( private playlistState : PlaylistState, private dataService : DataService, private socketService : SocketService ) {}

    ngOnInit() {
        this.index = this.playlistState.playList.indexOf(this.playlistitem);
    }

    deletePlaylistItem() {
        this.dataService.deletePlaylistItem(this.playlistitem._id).subscribe(
            res => {
                this.playlistState.playList.splice(this.index, 1);
                this.isDeleted = true;
                this.socketService.socket.emit("deletefromplaylist", this.playlistitem._id);
//                console.log("personal video succesfully deleted from database.", "success");
            }, error => { console.log(error); }
              );
        }
    onClickThumb() {
        this.playlistState.activeVideo = this.playlistitem;
        this.playlistState.isPlaying = true;
    }
}