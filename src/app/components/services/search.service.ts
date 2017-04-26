import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { VideoListState } from "./videolist-state.service";
import "rxjs/add/operator/map";
import { SettingService } from "./settings.service";

    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
    const API_TOKEN = "AIzaSyBfi6c18umgHxOPqM9FOWJ3JstDK3dG-f8";
    const ONLYMUSICVIDEOS = 10; // Id of music videos

@Injectable()
export class SearchService {
    seeking = false;
    maxresults : number;
  constructor(private settingService : SettingService, private http : Http, @Inject(VideoListState) private videoListState : VideoListState) {
    this.maxresults = Math.round(this.settingService.maxSongSearch / 2);
  }
    // Get all videos < 4 minutes
    fetchShortVideos(query : string) {
    if (query === "") {
        this.videoListState.videoList = [];
        this.videoListState.searched = false;
    }
    return this.http.get(`${BASE_URL}?part=snippet&q=${query}&maxResults=${this.maxresults}&type=video&videoCategoryId=${ONLYMUSICVIDEOS}&videoDuration=short&key=${API_TOKEN}`).map(response => response.json());
  }
    // Get all videos 4-20 minutes
    fetchMediumVideos(query : string) {
    if (query === "") {
        this.videoListState.videoList = [];
        this.videoListState.searched = false;
    }
    return this.http.get(`${BASE_URL}?part=snippet&q=${query}&maxResults=${this.maxresults}&type=video&videoCategoryId=${ONLYMUSICVIDEOS}&videoDuration=medium&key=${API_TOKEN}`).map(response => response.json());
  }
}