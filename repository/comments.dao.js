const Comment = require('../models/Comment');
const ApplicationError = require('../errors/ApplicationError');

class CommentRepository {
    constructor(CommentModel) {
        this.comment = CommentModel;
    }


    getComment = async (classified) => {
        try {
            const comments = await this.comment.find({ classifiedID: classified })
           // .populate('users')
            // .populate('comments');
            return comments
        } catch (error) {
            throw new ApplicationError(err);
        }
    };

    getAnsweredComment = async (comment) => {
        const { id } = comment;
        try {
            const comments = await this.comment.find({ answerOriginID: id })
           // .populate('users')
            // .populate('comments');
            return comments
        } catch (error) {
              throw new ApplicationError(err);
        }
    };

    postComment = async (newComment) => {
       
        const {  userId, category, classifiedID, answerOriginID, comment, status } = newComment;
        try {
            const createdPost = await this.comment.create({ userId, category, classifiedID, answerOriginID, comment, status });
            // .populate('users')
            // .populate('comments');
            return createdPost
        } catch (error) {
              throw new ApplicationError(err);
        }
    };

    rankComment = async (comment) => {
        const { id, likes, dislikes} = comment;
        try {
            const rankedComment = await this.comment.findByIdAndUpdate(
                id, {
                    likes, dislikes
                }, {
                  new: true
                }
              )
            return rankedComment;
        } catch (error) {
             throw new ApplicationError(err);
        }
    };

    deleteComment = async (comment) => {
        const { id } = comment;
        try {
            const deletedComment = await this.comment.findByIdAndDelete(id)
            return deletedComment;
        } catch (error) {
             throw new ApplicationError(err);
        }
    };

}


module.exports = new CommentRepository(Comment)
