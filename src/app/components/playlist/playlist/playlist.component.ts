import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import * as moment from "moment";
import { PlaylistState } from "../../services/playlist-state.service";
import { NgSemanticModule } from "ng-semantic";
import { DataService } from "../../../services/data.service";
import { SocketService } from "../../../services/socket.service";
import { AF } from "../../../providers/af";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-playlist",
  templateUrl: "playlist.component.html",
  styleUrls: ["playlist.component.scss"]
})
export class PlaylistComponent implements OnInit, OnDestroy {
    filterControl = new FormControl();
    @ViewChild("playlistplayer") playlistplayer : ElementRef;
    messageUpdate : boolean;
    _subscription : any;
    filterargs : any;
    orderargs = "rating";
    constructor( private playlistState : PlaylistState, private dataservice : DataService,
    private socketService : SocketService, private afService : AF ) {
        this.playlistState.notFound = false;
        this.playlistState.isPlaying = false;
        this.playlistState.playList = [];
        socketService.socket.on("playlistisupdated", (userid) => {
        if (userid === afService.uid) this.getPlaylist();
        else this.messageUpdate = true;
        });
    socketService.socket.on("itemdeleted", (id) => {
//        console.log("delete: " + id);
    for (let i = playlistState.playList.length - 1; i >= 0; i-- ) {
    if (playlistState.playList[i]) {
    if (playlistState.playList[i]._id === id) {
//    console.log("delete true");
        playlistState.playList[i].isdeleted = true;
    }}}});
    }
    ngOnInit() {
        this.playlistState.showUpdateButton = false;
        this.messageUpdate = false;
        this.getPlaylist();
        this.playlistState.activeVideo = undefined;
        this.playlistState.ratings = undefined;
        if (typeof this.afService.uid !== "undefined") {
            this.getAllRatings(this.afService.uid);
        } else {
            this._subscription = this.afService.changeId.subscribe((userid : string) => {
            this.getAllRatings(userid); });
        }
       this.filterControl.valueChanges
       .subscribe(newValue => this.filterargs = new RegExp(newValue, "i"));
    }
    ngOnDestroy() {
        if (typeof this._subscription !== "undefined") this._subscription.unsubscribe();
    }
    getPlaylist() {
        this.dataservice.getPlaylist().subscribe(
            data => {
            this.playlistState.playList = data;
            if (this.playlistState.playList.length === 0) this.playlistState.notFound = true;
            else this.playlistState.notFound = false;
            },
    error => { console.log(error); } ); }
    stop() {
        if (typeof this.playlistplayer === "undefined") return;
        this.playlistplayer.nativeElement.contentWindow.postMessage(JSON.stringify({"event" : "command", "func" : "stopVideo", "args" : "" || [] }), "*");
        this.playlistState.isPlaying = false;
    }
    refreshList() {
        this.orderargs = "rating";
        this.playlistState.showUpdateButton = false;
        this.messageUpdate = false;
        this.playlistState.ratings = undefined;
        this.getAllRatings(this.afService.uid);
        this.getPlaylist();
    }
    // get the ratings from the logged in user
    getAllRatings(userid : string) {
        this.dataservice.getAllRatingsUser(userid).subscribe(
                data => {
                this.playlistState.ratings = data.json();
                this.playlistState.ratingsLoaded.next("ready");
                },
                error => { console.log(error); }
            );
        }
}