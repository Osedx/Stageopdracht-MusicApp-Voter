import { Injectable } from "@angular/core";
import { Video } from "../models/video.model";


@Injectable()
export class VideoListState {

    videoList : Video[] = [];
    activeVideo : Video;
    isPlaying = false;
    searched = false;

  constructor() {
  }

}
