const { Schema, model } = require('mongoose');


const randomName = () => {
   return `anony${Math.floor(Math.random()*99,-2)}`
}

const userSchema = new Schema(
    {
        email: {
        type: String, 
        lowercase: true, 
        required: [true, "Não pode ser vazio"], 
        match: [/\S+@\S+\.\S+/, 'e-mail inválido'], 
        unique: true,
        trim: true,
        },
        cpf: {
            type: String, 
        },
        username: {
           type: String,
           default: randomName,
           min: 4,
           max: 20,
        },
        passwordHash:  {
            type: String,
            required: [true, 'Senha é necessario.'],
        },
        name: String,
        lastName: String,
        cep: {
            type: String,
            // match: [/^\d{5}-\d{3}$/, 'cep inválido'], 
        },
        street: String,
        streetNumber: String,
        streetComplement: String,
        neighborhood: String,
        city: String,
        state: String,
        phone: String,
        mobile: String,
        birthDate: String,
        profession: String,
        imgURL: String,
        classifieds: [String],
        score: Number,
        lastZipCodeUpdate: String,
        status: Number,
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true
    }
);

module.exports= model("User", userSchema);
