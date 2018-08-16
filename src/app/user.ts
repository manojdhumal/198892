export class User{
  //mobile: number;
  userStatus: String;
  userRegistrationDto: null;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
