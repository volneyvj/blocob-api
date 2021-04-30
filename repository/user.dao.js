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
        mobile, birthDate, profession, imgURL } = updateUser;
    const passwordHash = this.generateHash(password);
    try {
      const updatedUser = await this.User.findByIdAndUpdate(
        userId,
        {   email, cpf, username, passwordHash, name, lastName, cep, street, streetNumber, streetComplement, neighborhood, city, state, phone,
            mobile, birthDate, profession, imgURL, status },
      );
      return updatedUser;
    } catch (err) {
      throw new ApplicationError(err);
    }
  }

  async updatePassword(email, password) {
    const passwordHash = auth.encrypt(password);
    try {
      const updatepassword = await this.User.findOneAndUpdate(
        {email:email},
        {   passwordHash },
      );
      return updatepassword;
    } catch (err) {
      throw new ApplicationError(err);
    }
  }

  rankUser = async (user) => {
    const { id, likes } = user;
    console.log(id)
    try {
        const hasLiked = await this.User.find( {$and: [{likes: { $in: [likes]}}, {_id: id} ]}) 
        if (hasLiked.length === 0) {
        const rankeduser = await this.User.findByIdAndUpdate(
            id, 
{$push: {likes: likes}},
          )
          return rankeduser;
        }
        else {
        // let index = hasLiked[0].likes.indexOf(likes)
        const rankeduser = await this.User.findByIdAndUpdate(
                id, 
               { $pull: { likes: likes } },
                )
        }
        const like = false
        return like;
    } catch (error) {
        throw new ApplicationError(error);
    }
};

checkRankUser = async (payload) => {
    const { id, likes } = payload;
    try {
        const hasLiked = await this.User.find( {$and: [{likes: { $in: [likes]}}, {_id: id} ]}) 
        if (hasLiked.length === 0) {
            return false;
} else {
     return true ;
}
    } catch (error) {
        throw new ApplicationError(error);
    }
};

disrankUser = async (user) => {
  const { id, likes } = user;
  console.log(id)
  try {
      const hasDisliked = await this.User.find( {$and: [{dislikes: { $in: [likes]}}, {_id: id} ]}) 
      if (hasDisliked.length === 0) {
      const rankeduser = await this.User.findByIdAndUpdate(
          id, 
{$push: {dislikes: likes}},
        )
        return rankeduser;
      }
      else {
      // let index = hasLiked[0].likes.indexOf(likes)
      const rankeduser = await this.User.findByIdAndUpdate(
              id, 
             { $pull: { dislikes: likes } },
              )
      }
      const like = false
      return like;
  } catch (error) {
      throw new ApplicationError(error);
  }
};

checkDisrank = async (payload) => {
  const { id, likes } = payload;
  try {
      const hasDisliked = await this.User.find( {$and: [{dislikes: { $in: [likes]}}, {_id: id} ]}) 
      if (hasDisliked.length === 0) {
          return false;
} else {
   return true ;
}
  } catch (error) {
      throw new ApplicationError(error);
  }
};

}

module.exports = new UserRepository(User);
