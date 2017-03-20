export class Rating {
  constructor(public _id : string,
              public userid : string,
              public playlistitemid : string,
              public rating : string) {
    this._id = _id;
    this.userid = userid;
    this.playlistitemid = playlistitemid;
    this.rating = rating;
  };
}
module.exports = Rating;