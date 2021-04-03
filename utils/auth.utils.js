const bcrypt = require('bcryptjs');

class AuthUtils {
  constructor() {
    this.saltRounds = 10;
  }

  encrypt(password) {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  compare(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
  }
}

module.exports = new AuthUtils();
