import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import * as moment from "moment";
import { PlaylistState } from "../../services/playlist-state.service";
import { NgSemanticModule } from "ng-semantic";
import { DataService } from "../../../services/data.service";
import { SocketService } from "../../../services/socket.service";
import { AF } from "../../../providers/af";

@Component({
  selector: "app-playlist",
  templateUrl: "playlist.component.html",
  styleUrls: ["playlist.component.scss"]
})
export class PlaylistComponent implements OnInit {

    @ViewChild("playlistplayer") playlistplayer : ElementRef;
    messageUpdate = false;
    notFound = false;
    constructor( private playlistState : PlaylistState, private dataservice : DataService,
    private socketService : SocketService, private afService : AF ) {
        this.playlistState.playList = [];
        socketService.socket.on("playlistisupdated", (userid) => {
            this.messageUpdate = true;
            if (userid === afService.uid) this.refreshList();
        });
    socketService.socket.on("itemdeleted", (id) => {
        console.log("delete: " + id);
    for (let i = playlistState.playList.length - 1; i >= 0; i-- ) {
    if (playlistState.playList[i]._id === id) {
    console.log("delete true");
        playlistState.playList[i].isdeleted = true;
    }}});
    }
    ngOnInit() {
        this.getPlaylist();
        this.playlistState.activeVideo = undefined;
    }
    getPlaylist() {
        this.dataservice.getPlaylist().subscribe(
            data => {
            this.playlistState.playList = data;
            if (this.playlistState.playList.length === 0) this.notFound = true;
            else this.notFound = false;
            },
    error => { console.log(error); } ); }
    stop() {
        if (typeof this.playlistplayer === "undefined") return;
        this.playlistplayer.nativeElement.contentWindow.postMessage(JSON.stringify({"event" : "command", "func" : "stopVideo", "args" : "" || [] }), "*");
        this.playlistState.isPlaying = false;
    }
    refreshList() {
        this.messageUpdate = false;
        this.getPlaylist();
    }
}