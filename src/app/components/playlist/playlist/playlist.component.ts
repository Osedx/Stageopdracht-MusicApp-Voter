import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import * as moment from "moment";
import { PlaylistState } from "../../services/playlist-state.service";
import { NgSemanticModule } from "ng-semantic";
import { DataService } from "../../../services/data.service";

@Component({
  selector: "app-playlist",
  templateUrl: "playlist.component.html",
  styleUrls: ["playlist.component.scss"]
})
export class PlaylistComponent implements OnInit {
    @ViewChild("playlistplayer") playlistplayer : ElementRef;
    constructor( private playlistState : PlaylistState, private dataservice : DataService) {
        this.playlistState.playList = [];
    }
    ngOnInit() {
        this.getPlaylist();
        this.playlistState.activeVideo = undefined;
    }
    getPlaylist() {
        this.dataservice.getPlaylist().subscribe(
            data => {
            console.log(data);
            this.playlistState.playList = data;  },
    error => { console.log(error); } ); }
    stop() {
        if (typeof this.playlistplayer === "undefined") return;
        this.playlistplayer.nativeElement.contentWindow.postMessage(JSON.stringify({"event" : "command", "func" : "stopVideo", "args" : "" || [] }), "*");
        this.playlistState.isPlaying = false;
    }
}