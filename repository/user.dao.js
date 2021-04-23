const User = require('../models/User');
const auth = require('../utils/auth.utils');
const ApplicationError = require('../errors/ApplicationError');
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();


class UserRepository {
  constructor(UserModel) {
    this.User = UserModel;
  }

  async findAllUsers() {
    try {
      const user = await this.User.find();
      return user;
    } catch (err) {
      throw new ApplicationError(err);
    }
  }

  async findUser(email) {
    try {
      const user = await this.User.findOne(email);
      return user;
    } catch (err) {
      throw new ApplicationError(err);
    }
  }

  async findUserID(id) {
    try {
      const user = await this.User.findById(id.id);
      return user;
    } catch (err) {
      throw new ApplicationError(err);
    }
  }

  async findNeighboors(neighborhood) {
    try {
     const users = await this.User.find({neighborhood: neighborhood.neighborhood}).limit(10)
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
