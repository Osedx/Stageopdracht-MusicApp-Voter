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
    return this.http.get("/api/playlist").map(res => res.json());
  }

  getUserStatus(idtoken, id) : Observable<any> {
    return this.http.get(`/api/userstatus/${idtoken}/${id}`).map(res => res.json());
  }

  getAllUsers(id) : Observable<any> {
    return this.http.get(`/api/users/${id}`).map(res => res.json());
  }

  getOwnPlaylist(id : string) : Observable<any> {
    return this.http.get(`/api/personalvideos/${id}`, this.options);
  }

  addPlaylistItem(playlistitem : any) : Observable<any> {
    return this.http.post("/api/playlistitem", JSON.stringify(playlistitem), this.options);
  }

  addToplistItem(toplistitem : any) : Observable<any> {
    return this.http.post("/api/toplistitem", JSON.stringify(toplistitem), this.options);
  }

  updatePlaylist(playlistitem : any) : Observable<any> {
    return this.http.put(`/api/playlistitem/${playlistitem._id}`, JSON.stringify(playlistitem), this.options);
  }

  updateUser(tokenid : string, user : any) : Observable<any> {
//    console.log(user);
    return this.http.put(`/api/user/${tokenid}/${user._id}`, JSON.stringify(user), this.options);
  }

  updateUserStatus(tokenid : string, user : any) : Observable<any> {
//    console.log(JSON.stringify(user));
    return this.http.put(`/api/userstatus/${tokenid}/${user._id}`, JSON.stringify(user), this.options);
  }

  deletePlaylistItem(id : string) : Observable<any> {
    return this.http.delete(`/api/playlistitem/${id}`, this.options);
  }

  addRating(rating : any) : Observable<any> {
//    console.log(JSON.stringify(rating));
    return this.http.post("/api/rating", JSON.stringify(rating), this.options);
  }

  addUser(user : any, idToken : string) : Observable<any> {
//    console.log(JSON.stringify(user));
    return this.http.post(`/api/user/${idToken}`, JSON.stringify(user), this.options);
  }

 addUserToFirebase(user : any) : Observable<any> {
    return this.http.post("/api/userfirebase/", JSON.stringify(user), this.options);
  }

  deleteRating(rating : any) : Observable<any> {
    return this.http.delete(`/api/rating/${rating._id}`, this.options);
  }

  deleteRatings(id : string) : Observable<any> {
    return this.http.delete(`/api/ratings/${id}`, this.options);
  }

  deleteUser(tokenid : string, id : string) : Observable<any> {
    return this.http.delete(`/api/user/${tokenid}/${id}`, this.options);
  }

  getRatings(userid : string, playlistitemid : string) : Observable<any> {
        return this.http.get(`/api/rating/${userid}/${playlistitemid}`, this.options);
    }

  getAllRatingsUser(userid : string) : Observable<any> {
        return this.http.get(`/api/ratings/${userid}`, this.options);
    }

  getUser(id : string) : Observable<any> {
        return this.http.get(`/api/user/${id}`, this.options);
    }
}