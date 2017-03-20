export class Playlist {

  constructor(public _id : string,
              public title : string,
              public thumbnailurl : string,
              public channeltitle : string,
              public channelid : string,
              public description : string,
              public uploader : string,
              public uploaderid : string,
              public rating : number) {
    this._id = _id;
    this.title = title;
    this.thumbnailurl = thumbnailurl;
    this.channeltitle = channeltitle;
    this.channelid = channelid;
    this.description = description;
    this.uploader = uploader;
    this.uploaderid = uploaderid;
    this.rating = rating;
  };
}
module.exports = Playlist;