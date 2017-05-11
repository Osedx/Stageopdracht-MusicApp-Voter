import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { PlaylistState } from "../../services/playlist-state.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-videolist",
  templateUrl: "videolist.component.html",
  styleUrls: ["videolist.component.scss"]
})
export class VideolistComponent implements OnInit {
    filterControl = new FormControl();
    filterargs : any;
    orderargs = "rating";
constructor( private dataservice : DataService, private playlistState : PlaylistState ) {
        this.playlistState.playList = [];
        this.getAllVideos();
        this.playlistState.notFound = false;
}
ngOnInit() {
    this.filterControl.valueChanges
    .subscribe(newValue => this.filterargs = new RegExp(newValue, "i"));
}
getAllVideos() {
        this.dataservice.getPlaylist().subscribe(
            data => {
            this.playlistState.playList = data;
//    console.log(this.playlistState.playList.length);
            if (this.playlistState.playList.length === 0) this.playlistState.notFound = true;
            else this.playlistState.notFound = false;
//            console.log("Videolist " + data);
            }, error => { console.log(error); } );
    }
}