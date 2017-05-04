import { Injectable } from "@angular/core";
import { Playlist } from "../models/playlist.model";
import { Rating } from "../models/rating.model";
import { Subject } from "rxjs/Subject";


@Injectable()
export class PlaylistState {

    playList : Playlist[] = [];
    ratings : Rating[] = undefined;
    activeVideo : Playlist;
    isPlaying = false;
    showUpdateButton = false;
    public ratingsLoaded : Subject<string> = new Subject<string>();

  constructor() {
  }

}
