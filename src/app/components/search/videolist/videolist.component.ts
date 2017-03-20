import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";
import { Video } from "../../models/video.model";
import * as moment from "moment";
import { VideoListState } from "../../services/videolist-state.service";
import { NgSemanticModule } from "ng-semantic";

@Component({
  selector: "app-videolist",
  templateUrl: "videolist.component.html",
  styleUrls: ["videolist.component.scss"]
})
export class VideoListComponent implements OnInit {
    @ViewChild("videoplayer") videoplayer : ElementRef;
//    videoListShort : Video[] = [];
//    videoListMedium : Video[] = [];
    constructor(private videoListState : VideoListState) {
        this.videoListState.videoList = [];
    }
    ngOnInit() {
    this.videoListState.activeVideo = undefined;
    this.videoListState.isPlaying = false;
    this.videoListState.isPlaying = false;
    }
    stop() {
        if (typeof this.videoplayer === "undefined") return;
        this.videoplayer.nativeElement.contentWindow.postMessage(JSON.stringify({"event" : "command", "func" : "stopVideo", "args" : "" || [] }), "*");
        this.videoListState.isPlaying = false;
    }
}