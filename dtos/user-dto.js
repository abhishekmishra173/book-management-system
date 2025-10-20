class UserDto {
  // Public-facing properties
  id;
  name;
  surname;
  email;

  constructor(user) {
    // The 'user' parameter is the Mongoose model object from the database
    this.id = user._id;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
  }
}

module.exports = UserDto;
