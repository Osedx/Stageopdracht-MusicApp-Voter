import { Component } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { PlaylistState } from "../../services/playlist-state.service";

@Component({
  selector: "app-videolist",
  templateUrl: "videolist.component.html",
  styleUrls: ["videolist.component.scss"]
})
export class VideolistComponent {
        notFound = false;
constructor( private dataservice : DataService, private playlistState : PlaylistState ) {
        this.playlistState.playList = [];
        this.getAllVideos();
}
getAllVideos() {
        this.dataservice.getPlaylist().subscribe(
            data => {
            this.playlistState.playList = data;
    console.log(this.playlistState.playList.length);
            if (this.playlistState.playList.length === 0) this.notFound = true;
            else this.notFound = false;
            console.log("Videolist " + data);  },
    error => { console.log(error); } );
    }
}