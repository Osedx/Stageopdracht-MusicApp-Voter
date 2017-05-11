import {Component, ViewChild, OnInit } from "@angular/core";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { VideoListState } from "../../services/videolist-state.service";
import { SearchService } from "../../services/search.service";
import * as moment from "moment";
import { Video } from "../../models/video.model";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-searchbar",
  providers: [SearchService],
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"]
})

export class SearchbarComponent implements OnInit {
    search = new FormControl();
    videoList : Video[] = [];
    videoListShort : Video[] = [];
    videoListMedium : Video[] = [];
    first = true;
    @ViewChild("name") vc : any;

constructor(private searchService : SearchService, private videoListState : VideoListState ) {
    this.videoListState.searched = false;
    this.videoListState.notFound = false;
}
ngOnInit() {
   this.search.valueChanges
       .debounceTime(400)
       .switchMap(query => {
        return this.searchService.fetchShortVideos(query); })
        .subscribe(data => {
        this.videoListShort = data.items.map((item : any) => {
        return new Video(
            item.id.videoId,
            item.snippet.title,
            item.snippet.thumbnails.high.url,
            item.snippet.channelTitle,
            item.snippet.channelId,
            moment(item.snippet.publishedAt).fromNow(),
            item.snippet.description);
            });
            if (this.first) {
                this.videoListState.videoList = [];
                this.videoListState.searched = true;
                this.first = false;
                    }
            else this.first = true;
                this.videoListState.videoList = this.videoListState.videoList.concat(this.videoListShort);
                if (this.videoListState.videoList.length === 0) this.videoListState.notFound = true;
                else this.videoListState.notFound = false;
            });
   this.search.valueChanges
    .debounceTime(400)
       .switchMap(query => {
       return this.searchService.fetchMediumVideos(query); })
    .subscribe(data => {
        this.videoListMedium = data.items.map((item : any) => {
          return new Video(
            item.id.videoId,
            item.snippet.title,
            item.snippet.thumbnails.high.url,
            item.snippet.channelTitle,
            item.snippet.channelId,
            moment(item.snippet.publishedAt).fromNow(),
            item.snippet.description);
        });
            if (this.first) {
                this.videoListState.videoList = [];
                this.videoListState.searched = true;
                this.first = false;
            }
            else this.first = true;
                this.videoListState.videoList = this.videoListState.videoList.concat(this.videoListMedium);
                if (this.videoListState.videoList.length === 0) this.videoListState.notFound = true;
                else this.videoListState.notFound = false;
      });
}
    ngAfterViewInit() {
    this.vc.nativeElement.focus();
  }
}