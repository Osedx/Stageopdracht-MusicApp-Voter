import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Playlist } from "../../models/playlist.model";
import { PlaylistState } from "../../services/playlist-state.service";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { PlaylistComponent} from "../playlist/playlist.component";
import { NgSemanticModule } from "ng-semantic";
import { DataService } from "../../../services/data.service";
import { SettingService } from "../../services/settings.service";
import { Rating } from "../../../components/models/rating.model";
import { AF } from "../../../providers/af";
import { SocketService } from "../../../services/socket.service";

@Component({
  selector: "app-playlist-item",
  templateUrl: "playlist-item.component.html",
  styleUrls: ["playlist-item.component.scss"]
})
export class PlaylistItemComponent implements OnDestroy, OnInit {
    private host : string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    clicked : boolean;
    @Input() playlistitem : Playlist;
    @Input() index : number;
    @Input() modal : NgSemanticModule;
    rating : Rating;
    _subscription : any;
    thumbsupactive : Boolean = false;
    thumbsupdisabled : Boolean = true;
    thumbsdownactive : Boolean = false;
    thumbsdowndisabled : Boolean = true;
    deleted = false;


    constructor(private playlistState : PlaylistState, private dataService : DataService, private afService : AF, private settingService : SettingService, private socketService : SocketService ) {
    }

    ngOnDestroy() {
            if (typeof this._subscription !== "undefined") this._subscription.unsubscribe();
    }

    ngOnInit() {
            if (typeof this.afService.uid !== "undefined") {
            this.getRatings(this.afService.uid, this.playlistitem._id);
            }
            else {
            this._subscription = this.afService.changeId.subscribe((userid : string) => {
            this.getRatings(userid, this.playlistitem._id);
            }); }}

        onClickThumb() {
        this.playlistState.activeVideo = this.playlistitem;
        this.playlistState.isPlaying = true;
        }

        thumbsdown() {
        if (this.thumbsdowndisabled === false) {
            if (this.thumbsdownactive === false) {
                this.thumbsdownactive = true;
                this.thumbsupdisabled = true;
                this.playlistitem.rating -= 1;
            if (this.playlistitem.rating <= -this.settingService.removeAfterDislikes) {
                this.deleteFromPlaylist();
            }
            else {
                this.updatePlaylist();
                this.createRating("disliked");
            }
            }
            else {
                this.thumbsdownactive = false;
                this.thumbsupdisabled = false;
                this.playlistitem.rating += 1;
                this.updatePlaylist();
                this.deleteRating();
            }
        }
        }

        thumbsup() {
        if (this.thumbsupdisabled === false) {
            if (this.thumbsupactive === false) {
                this.thumbsupactive = true;
                this.thumbsdowndisabled = true;
                this.playlistitem.rating += 1;
                this.updatePlaylist();
                this.createRating("liked");
            if (this.playlistitem.rating >= this.settingService.addToToplist) {
                this.addToToplist();
            }}
            else {
                this.thumbsupactive = false;
                this.thumbsdowndisabled = false;
                this.playlistitem.rating -= 1;
                this.updatePlaylist();
                this.deleteRating();
            }
        }}
    // update the rating of the playlist
        updatePlaylist() {
        this.dataService.updatePlaylist(this.playlistitem).subscribe(
            res => { this.socketService.socket.emit("updateplaylist", this.afService.uid); },
            error => { console.log(error); }
        ); }
    // add to song to toplist
        addToToplist() {
            this.dataService.addToplistItem({"_id" : this.playlistitem._id, "title" : this.playlistitem.title,
                "thumbnailurl" : this.playlistitem.thumbnailurl, "channeltitle" : this.playlistitem.channeltitle,
                "channelid" : this.playlistitem.channelid, "description" : this.playlistitem.description}).subscribe(
            res => {
                const newToplistItem = res.json();
//                console.log(newToplistItem);
          },
        error => {console.log(error); }
        );
        }
    // create a new rating in the database
        createRating(rating : string) {
            this.dataService.addRating({ "userid" : this.afService.uid, "playlistitemid" : this.playlistitem._id, "rating" : rating }).subscribe(
            res => {
                this.rating = res.json();
                console.log(this.rating);
                console.log("rating successfully added to database.", "success");
          },
          error => console.log(error)
        );
        }
    // calls the methods for deleting the playlistitem and associated ratings
        deleteFromPlaylist() {
            this.deletePlaylistItem(this.playlistitem._id);
            this.deleteRatings(this.playlistitem._id);
        }
    // delete the playlistitem by id
        deletePlaylistItem(id : string) {
             this.dataService.deletePlaylistItem(id).subscribe(
                res => {
//                  this.playlistState.playList.splice(this.index, 1);
                    this.playlistitem.isdeleted = true;
                    this.socketService.socket.emit("deletefromplaylist", this.playlistitem._id);
                    console.log("playlistitem succesfully deleted from database.", "success");
                },
                error => { console.log(error); }
              );
        }
    // delete all ratings with the given playlistitemid
        deleteRatings(id : string) {
             this.dataService.deleteRatings(id).subscribe(
                res => {
                console.log(this.rating);
                console.log("ratings succesfully deleted from database.", "success");
                },
                error => { console.log(error); }
              );
        }
    // delete the rating the clicked rating of the logged in user
        deleteRating() {
              this.dataService.deleteRating(this.rating).subscribe(
                res => {
                this.rating._id = null;
                this.rating.rating = null;
                console.log(this.rating);
                    console.log("rating succesfully deleted from database.", "success");
                },
                error => { console.log(error); }
              );
        }
    // get the ratings from the logged in user
        getRatings(userid : string, playlistitemid : string) {
        this.dataService.getRatings(userid, playlistitemid).subscribe(
                data => {
                this.rating = data.json();
                this.setRating();
                },
                error => { console.log(error); }
            );

        }
    // set thumbs active or disabled
        setRating() {
        if (this.rating != null) {
            if (typeof this.rating.rating === "string" || this.rating.rating instanceof String) {
                    if (this.rating.rating === "liked") {
                        this.thumbsupdisabled = false;
                        this.thumbsupactive = true;
                    }
                    else if (this.rating.rating === "disliked") {
                        this.thumbsdowndisabled = false;
                        this.thumbsdownactive = true;
                    }
                }
            } else {
                this.thumbsupdisabled = false;
                this.thumbsdowndisabled = false;
            }
        }
}