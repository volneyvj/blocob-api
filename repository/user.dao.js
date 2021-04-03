const User = require('../models/User');
const auth = require('../utils/auth.utils');
const ApplicationError = require('../errors/ApplicationError');


class UserRepository {
  constructor(UserModel) {
    this.User = UserModel;
  }

  async findUser(email) {
    try {
      const user = await this.User.findOne(email);
      return user;
    } catch (err) {
      throw new ApplicationError(err);
    }
  }

  async findNeighboors(neighborhood) {
    try {
     const users = await this.User.find(neighborhood)
      return users;
    } catch (err) {
      throw new ApplicationError(err);
    }
  }

  async register(user) {
    try {
      // const {   email, cpf, username, password, name, lastName, cep, street, streetNumber, streetComplement, neighborhood, city, state, phone,
      //   mobile, birthDate, profession, imgURL, score, lastZipCodeUpdate, status } = user;
      const passwordHash = auth.encrypt(user.password);
      const newUser = new this.User( {...user, passwordHash} );
      newUser.save();
      return newUser;
    } catch (err) {
      throw new ApplicationError(err);
    }
  }

  async updateUser(userId, updateUser) {
    const {   email, cpf, username, password, name, lastName, cep, street, streetNumber, streetComplement, neighborhood, city, state, phone,
        mobile, birthDate, profession, imgURL, score, lastZipCodeUpdate, status } = updateUser;
    const passwordHash = this.generateHash(password);
    try {
      const updatedUser = await this.User.findByIdAndUpdate(
        userId,
        {   email, cpf, username, passwordHash, name, lastName, cep, street, streetNumber, streetComplement, neighborhood, city, state, phone,
            mobile, birthDate, profession, imgURL, score, lastZipCodeUpdate, status },
      );
      return updatedUser;
    } catch (err) {
      throw new ApplicationError(err);
    }
  }
}

module.exports = new UserRepository(User);
