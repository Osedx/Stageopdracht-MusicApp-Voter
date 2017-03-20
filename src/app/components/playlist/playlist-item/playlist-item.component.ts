import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Playlist } from "../../models/playlist.model";
import { PlaylistState } from "../../services/playlist-state.service";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { PlaylistComponent} from "../playlist/playlist.component";
import { NgSemanticModule } from "ng-semantic";
import { DataService } from "../../../services/data.service";
import { Rating } from "../../../components/models/rating.model";
import { AF } from "../../../providers/af";

@Component({
  selector: "app-playlist-item",
  templateUrl: "playlist-item.component.html",
  styleUrls: ["playlist-item.component.scss"]
})
export class PlaylistItemComponent implements OnDestroy, OnInit {
    clicked : boolean;
    @Input() playlistitem : Playlist;
    @Input() index : number;
    @Input() modal : NgSemanticModule;
    rating : Rating;
    _subscription : any;
    thumbsupactive : Boolean;
    thumbsupdisabled : Boolean;
    thumbsdownactive : Boolean;
    thumbsdowndisabled : Boolean;


    constructor(private playlistState : PlaylistState, private dataService : DataService, private afService : AF ) {}

    ngOnDestroy() {
            if (typeof this._subscription !== "undefined") this._subscription.unsubscribe();
    }

    ngOnInit() {
        this.thumbsupactive = false;
        this.thumbsupdisabled = false;
        this.thumbsdownactive = false;
        this.thumbsdowndisabled = false;
//        console.log(this.playlistitem);
            if (typeof this.afService.uid !== "undefined") {
            this.getRatings(this.afService.uid, this.playlistitem._id);
            }
            else {
            this._subscription = this.afService.changeId.subscribe((userid : String) => {
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
            if (this.playlistitem.rating <= -3) {
                this.deleteFromPlaylist();
            }
                else {
                this.updatePlaylist();
                this.createRating("disliked"); }
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
            }
            else {
                this.thumbsupactive = false;
                this.thumbsdowndisabled = false;
                this.playlistitem.rating -= 1;
                this.updatePlaylist();
                this.deleteRating();
            }
        }}

        updatePlaylist() {
        this.dataService.updatePlaylist(this.playlistitem).subscribe(
            res => { console.log("item updated successfully.", "success"); },
            error => { console.log(error); }
        ); }

        createRating(rating : String) {
            this.dataService.addRating({ "userid" : this.afService.uid, "playlistitemid" : this.playlistitem._id, "rating" : rating }).subscribe(
            res => {
                this.rating = res.json();
                console.log(this.rating);
                console.log("rating successfully added to database.", "success");
          },
          error => console.log(error)
        );
        }

        deleteFromPlaylist() {
            this.deletePlaylistItem(this.playlistitem._id);
            this.deleteRatings(this.playlistitem._id);
        }

        deletePlaylistItem(id : String) {
             this.dataService.deletePlaylistItem(id).subscribe(
                res => { this.playlistState.playList.splice(this.index, 1);
                    console.log(this.index);
                    console.log(this.playlistitem);
                    console.log("playlistitem succesfully deleted from database.", "success");
                },
                error => { console.log(error); }
              );
        }

    deleteRatings(id : String) {
             this.dataService.deleteRatings(id).subscribe(
                res => {
                console.log(this.rating);
                console.log("ratings succesfully deleted from database.", "success");
                },
                error => { console.log(error); }
              );
        }

        deleteRating() {
              this.dataService.deleteRating(this.playlistitem).subscribe(
                res => {
                this.rating._id = null;
                this.rating.rating = null;
                console.log(this.rating);
                    console.log("rating succesfully deleted from database.", "success");
                },
                error => { console.log(error); }
              );
        }

        getRatings(userid : String, playlistitemid : String) {
        this.dataService.getRatings(userid, playlistitemid).subscribe(
                data => {
                this.rating = data.json();
                this.setRating();
                },
    error => { console.log(error); }
            );

        }

        setRating() {
        if ( this.afService.uid === this.playlistitem.uploaderid) {
                                    this.thumbsupdisabled = true;
                                    this.thumbsdowndisabled = true;
        }
        else if (this.rating != null) {
            if (typeof this.rating.rating === "string" || this.rating.rating instanceof String) {
                    if (this.rating.rating === "liked") {
                        this.thumbsupactive = true;
                        this.thumbsdowndisabled = true;
                    }
                    else if (this.rating.rating === "disliked") {
                        this.thumbsdownactive = true;
                        this.thumbsupdisabled = true;
                    }
                }
            }
        }
}