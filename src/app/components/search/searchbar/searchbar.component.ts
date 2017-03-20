import {Component, ViewChild } from "@angular/core";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { VideoListState } from "../../services/videolist-state.service";
import { SearchService } from "../../services/search.service";
import * as moment from "moment";
import {Video} from "../../models/video.model";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-searchbar",
  providers: [SearchService],
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"]
})

export class SearchbarComponent {
    search = new FormControl();
    videoList : Video[] = [];
    videoListShort : Video[] = [];
    videoListMedium : Video[] = [];
    first = true;
    @ViewChild("name") vc : any;

constructor(private SearchService : SearchService, private videoListState : VideoListState ) {
   this.search.valueChanges
       .debounceTime(200)
       .switchMap(query => this.SearchService.fetchShortVideos(query))
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
                this.first = false;
                    }
            else this.first = true;
                this.videoListState.videoList = this.videoListState.videoList.concat(this.videoListShort);
            });
   this.search.valueChanges
    .debounceTime(200)
    .switchMap(query => this.SearchService.fetchMediumVideos(query))
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
                this.first = false;
            }
            else this.first = true;
                this.videoListState.videoList = this.videoListState.videoList.concat(this.videoListMedium);
      });
}
    ngAfterViewInit() {
    this.vc.nativeElement.focus();
  }
}