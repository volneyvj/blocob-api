const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        userID: { type: Schema.Types.ObjectId, ref: 'User' },
        category: {
            type: String,
            enum: ['news', 'classifieds', 'answer'],
       },
        classifiedID: { type: Schema.Types.ObjectId, ref: 'Classified' },
        answerOriginID: Schema.Types.ObjectId,
        comment: String,
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        status: Number,
    },
    {
        timestamps: true
    }
);

module.exports= model("Comment", commentSchema);
