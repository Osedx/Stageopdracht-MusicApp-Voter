import { Injectable } from "@angular/core";
import {VideoListState} from "./videolist-state.service";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
    const API_TOKEN = "AIzaSyBfi6c18umgHxOPqM9FOWJ3JstDK3dG-f8";
    const MAXRESULTS = 20; // Echte aantal is dit maar 2 want er worden 2 calls gemaakt, 1 voor kort en 1 vo medium lengte video
    const ONLYMUSICVIDEOS = 10;

@Injectable()
export class SearchService {
  constructor(private http : Http, private videoListState : VideoListState) {}
    fetchShortVideos(query : string) {
    return this.http.get(`${BASE_URL}?part=snippet&q=${query}&maxResults=${MAXRESULTS}&type=video&videoCategoryId=${ONLYMUSICVIDEOS}&videoDuration=short&key=${API_TOKEN}`).map(response => response.json());
  }
    fetchMediumVideos(query : string) {
    return this.http.get(`${BASE_URL}?part=snippet&q=${query}&maxResults=${MAXRESULTS}&type=video&videoCategoryId=${ONLYMUSICVIDEOS}&videoDuration=medium&key=${API_TOKEN}`).map(response => response.json());
  }
}