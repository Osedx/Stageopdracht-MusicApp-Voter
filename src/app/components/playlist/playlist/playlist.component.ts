import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import * as moment from "moment";
import { PlaylistState } from "../../services/playlist-state.service";
import { NgSemanticModule } from "ng-semantic";
import { DataService } from "../../../services/data.service";
import { SettingService } from "../../services/settings.service";

@Component({
  selector: "app-playlist",
  templateUrl: "playlist.component.html",
  styleUrls: ["playlist.component.scss"]
})
export class PlaylistComponent implements OnInit {
    @ViewChild("playlistplayer") playlistplayer : ElementRef;
    public lengthPlaylist : number;
    constructor( private playlistState : PlaylistState, private dataservice : DataService,
    public settingService : SettingService) {
        this.playlistState.playList = [];
    }
    ngOnInit() {
        this.getPlaylist();
        this.playlistState.activeVideo = undefined;
    }
    getPlaylist() {
        this.dataservice.getPlaylist().subscribe(
            data => {
        if ( data.length < this.settingService.addFromToplist ) {
            this.lengthPlaylist = data.length;
            this.addFromToplist();
        }
        this.playlistState.playList = data;
        },
    error => { console.log(error); } ); }
    stop() {
        if (typeof this.playlistplayer === "undefined") return;
        this.playlistplayer.nativeElement.contentWindow.postMessage(JSON.stringify({"event" : "command", "func" : "stopVideo", "args" : "" || [] }), "*");
        this.playlistState.isPlaying = false;
    }
    private addFromToplist() {
        this.dataservice.getToplist().subscribe(
        (data) => {
        if (typeof(data) !== "undefined") {
                console.log(data);
                const max = data.length;
                console.log(Math.random());
                const randomIndex = Math.floor(Math.random() * (max));
                console.log(randomIndex);
                console.log(data[randomIndex]);
                console.log(this.playlistState.playList);
                this.addToPlaylist(data[randomIndex]);
                this.playlistState.playList[this.lengthPlaylist] = data[randomIndex];
                console.log(this.playlistState.playList);
                }
            },
        (error) => { console.log(error); } ); }
        private addToPlaylist(toplistitem : any) {
           this.dataservice.addPlaylistItem({"_id" : toplistitem.videoId, "title" : toplistitem.title, "thumbnailurl" : toplistitem.thumbnailUrl, "channeltitle" : toplistitem.channelTitle, "channelid" : toplistitem.channelId, "description" : toplistitem.description, "uploader" : "Toplist", "rating" : 0 }).subscribe(
            res => {
                const newPlaylistItem = res.json();
                console.log(newPlaylistItem);
          },
          error => console.log(error)
        );
        }
}