export class User {

  constructor(public _id : string,
              public name : string,
              public email : string,
              public role : string) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.role = role;
  };
}
module.exports = User;