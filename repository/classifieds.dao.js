const Classified = require('../models/Classified');
const ApplicationError = require('../errors/ApplicationError');
ObjectId = require('mongodb').ObjectID;

class ClassifiedRepository {
    constructor(ClassifiedModel) {
        this.classified = ClassifiedModel;
    }

    getAllFromNeighborhood = async (neighborhood) => {
        try {
            const classifieds = await this.classified.find({ neighborhood: neighborhood }).limit(30);
           // .populate('users')
            // .populate('comments');
             return classifieds
             
        } catch (error) {
        throw new ApplicationError(err);
        }
    };

    getTopEight = async (neighborhood) => {
        try {
            const topEight = await this.classified.find({ neighborhood: neighborhood }).limit(6);
            // .aggregate({$unwind:"$likes"}, { $group : {_id:'$_id', ct:{$sum:1}}}, { $sort :{ ct: -1}} );
            // .populate('users')
            // .populate('comments');
            // console.log(topEight)
            return topEight
        } catch (error) {
          throw new ApplicationError(err);
        }
    };

    getAllFromQuery = async (payload) => {
        const { neighborhood, query } = payload
        try {
            let classifieds = await this.classified.find({
                $and: [
                    { neighborhood: neighborhood },
                    { $or: [{ "title": { $regex: `.*${query}.*` } }, { "description": { $regex: `.*${query}.*` }}] }
                ]
            })
            console.log(classifieds)
           // .populate('users')
            // .populate('comments');
             return classifieds
        } catch (error) {
        throw new ApplicationError(err);
        }
    };

    getAllFromUser = async (payload) => {
        const { userID } = payload
        try {
            const classifieds = await this.classified.find({userID: userID})
            // .populate('users')
            // .populate('comments');
            return classifieds
        } catch (error) {
          throw new ApplicationError(error);
        }
    };

    getSingleClassified = async (id) => {
        // const { id } = classified;
        try {
            const singleClassified = await this.classified.find({_id: id})
            .populate('User')
            return singleClassified
        } catch (error) {
          throw new ApplicationError(error);
        }
    };
  
    addClassified = async (newClassified) => {
        try {
            const createdClassified = await this.classified.create(newClassified);
            return createdClassified;
        } catch (error) {
        throw new ApplicationError(error);
        }
    };

    updateClassified = async (editClassified) => {
        const { id, userID, subcategory, title, neighborhood, description, imgURL, price, measure, delivery, motive, investment, filePDF, address, desiredDate, status} = editClassified;
        try {
            const updatedClassified = await this.classified.findByIdAndUpdate(
                id, {
                    subcategory, title, neighborhood, description, imgURL, price, measure, delivery, motive, investment, filePDF, address, desiredDate, status
                }, {
                  new: true
                }
              )
            return updatedClassified;
        } catch (error) {
            throw new ApplicationError(error);
        }
    };

    rankClassified = async (classified) => {
        const { id, likes } = classified;
        try {
            const hasLiked = await this.classified.find( {$and: [{likes: { $in: [likes]}}, {_id: id} ]}) 
            if (hasLiked.length === 0) {
            const rankedClassified = await this.classified.findByIdAndUpdate(
                id, 
{$push: {likes: likes}},
              )
              return rankedClassified;
            }
            else {
            // let index = hasLiked[0].likes.indexOf(likes)
            const rankedClassified = await this.classified.findByIdAndUpdate(
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

    checkRankClassified = async (payload) => {
        const { id, likes } = payload;
        try {
            const hasLiked = await this.classified.find( {$and: [{likes: { $in: [likes]}}, {_id: id} ]}) 
            if (hasLiked.length === 0) {
                return false;
    } else {
         return true ;
    }
        } catch (error) {
            throw new ApplicationError(error);
        }
    };

    deleteClassified = async (id) => {
        try {
            const deletedClassified = await this.classified.findByIdAndDelete(id)
            return deletedClassified;
        } catch (error) {
        throw new ApplicationError(error);
        }
    };

    checkLike = async (classified) => {
        const { id, likes } = classified;
        try {
            const hasLiked = await this.classified.find({likes: { $in: [likes] }})
            if (hasLiked.length === 0) {
              return false;
            }
            else {
            return true
        } 
    }
            catch (error) {
            throw new ApplicationError(error);
        }
    };

}

//img url 
// ids
// update nehighborhood de todos classificados se mudar cep do usuario



module.exports = new ClassifiedRepository(Classified)
