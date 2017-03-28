import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class DataService {

  private headers = new Headers({ "Content-Type": "application/json", "charset": "UTF-8" });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http : Http) { }

  getPlaylist() : Observable<any> {
    return this.http.get("/playlist").map(res => res.json());
  }

  getOwnPlaylist(id : String) : Observable<any> {
    console.log(id);
    return this.http.get(`/personalvideos/${id}`, this.options);
  }

  addPlaylistItem(playlistitem : any) : Observable<any> {
    console.log(JSON.stringify(playlistitem));
    return this.http.post("/playlistitem", JSON.stringify(playlistitem), this.options);
  }

  addToplistItem(toplistitem : any) : Observable<any> {
    console.log(JSON.stringify(toplistitem));
    return this.http.post("/toplistitem", JSON.stringify(toplistitem), this.options);
  }

  updatePlaylist(playlistitem : any) : Observable<any> {
    return this.http.put(`/playlistitem/${playlistitem._id}`, JSON.stringify(playlistitem), this.options);
  }

  deletePlaylistItem(id : String) : Observable<any> {
    return this.http.delete(`/playlistitem/${id}`, this.options);
  }

  addRating(rating : any) : Observable<any> {
    console.log(JSON.stringify(rating));
    return this.http.post("/rating", JSON.stringify(rating), this.options);
  }

  deleteRating(rating : any) : Observable<any> {
    console.log("delete - ratingid: " + rating._id);
    console.log("delete - playlistitemid: " + rating.playlistitemid);
    return this.http.delete(`/rating/${rating._id}`, this.options);
  }

  deleteRatings(id : String) : Observable<any> {
    console.log(id);
    return this.http.delete(`/ratings/${id}`, this.options);
  }

getRatings(userid : String, playlistitemid : String) : Observable<any> {
        return this.http.get(`/rating/${userid}/${playlistitemid}`, this.options);
    }
}