const Classified = require('../models/Classified');
const ApplicationError = require('../errors/ApplicationError');

class ClassifiedRepository {
    constructor(ClassifiedModel) {
        this.classified = ClassifiedModel;
    }

    getAllFromNeighborhood = async (neighborhood) => {
        try {
            const classifieds = await this.classified.find({ neighborhood: neighborhood })
           // .populate('users')
            // .populate('comments');
            return classifieds
        } catch (error) {
        throw new ApplicationError(err);
        }
    };

    getTopEight = async (neighborhood) => {
        try {
            const topEight = await this.classified.find({ neighborhood: neighborhood }).aggregate({$unwind:"$likes"}, { $group : {_id:'$_id', ct:{$sum:1}}}, { $sort :{ ct: -1}} );
            // .populate('users')
            // .populate('comments');
            return topEight
        } catch (error) {
          throw new ApplicationError(err);
        }
    };


    getAllFromQuery = async (search) => {
        const { query } = search;
        try {
            const classifieds = await this.classified.find({ $or: [{ "title": { $regex: `.*${query}.*` } }, { "description": { $regex: `.*${query}.*` } }] })
            // .populate('users')
            // .populate('comments');
            return classifieds
        } catch (error) {
          throw new ApplicationError(err);
        }
    };


    getAllFromUser = async (user) => {
        const { id } = user;
        try {
            const classifieds = await this.classified.find({userID: id})
            // .populate('users')
            // .populate('comments');
            return classifieds
        } catch (error) {
          throw new ApplicationError(err);
        }
    };

    getSingleClassified = async (id) => {
        // const { id } = classified;
        try {
            const singleClassified = await this.classified.find({_id: id})
            // .populate('users')
            // .populate('comments');
            return singleClassified
        } catch (error) {
          throw new ApplicationError(err);
        }
    };
  
    addClassified = async (newClassified) => {
        console.log(newClassified)
        try {
            const createdClassified = await this.classified.create(newClassified);
            return createdClassified;
        } catch (error) {
        throw new ApplicationError(err);
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
            throw new ApplicationError(err);
        }
    };

    rankClassified = async (classified) => {
        const { id } = classified;
        console.log(classified)
        try {
            const rankedClassified = await this.classified.findByIdAndUpdate(
                id, 
{$push: {likes: "1",}},
                {
                }
              )
            return rankedClassified;
        } catch (error) {
            throw new ApplicationError(err);
        }
    };

    deleteClassified = async (id) => {
        console.log(id)
        try {
            const deletedClassified = await this.classified.findByIdAndDelete(id)
            return deletedClassified;
        } catch (error) {
        throw new ApplicationError(err);
        }
    };

}

//img url 
// ids
// update nehighborhood de todos classificados se mudar cep do usuario



module.exports = new ClassifiedRepository(Classified)
