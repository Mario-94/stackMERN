const { Schema, model } = require("mongoose");
const useSchema = new Schema(
    {
        userName: {
            type: String,
            require: true,
            // me elimina los dobles espacios en una cadena de texto
            trime: true,
        },
        email: {
            type: String,
            required: true,
            trime: true,
            unique: true
        },
    },
    { timestamps: true }
);
module.exports = model('User', useSchema)