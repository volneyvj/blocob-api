const { Schema, model } = require('mongoose');

const classifiedSchema = new Schema(
    {
        userID: { type: Schema.Types.ObjectId, ref: 'User' },
        category: {
            type: String,
            enum: ['Produto', 'Serviço', 'Projeto'],
       },
        subcategory: {
            type: String,
            max: 50,
        },
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        title: {
            type: String,
            required: true,
        },
        neighborhood: String,
        description: String,
        imgURL: String,
        price: Number,
        measure: String,
        delivery: String,
        // exclusivos serviços
        testimonials: [{
            testimonial: String,
            otherUserID: { type: Schema.Types.ObjectId, ref: 'User' },
        }],
        // exclusivos projeto
        motive: String,
        investment: Number,
        filePDF: String,
        address: String,
        desiredDate: String,
        confirmedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        // 
        status: Number,
    },
    {
        timestamps: true
    }
);

module.exports= model("Classified", classifiedSchema);


// ItemSchema.path('price').get(function(num) {
//     return (num / 100).toFixed(2);
//   });
  
//   // Setter
//   ItemSchema.path('price').set(function(num) {
//     return num * 100;
//   });