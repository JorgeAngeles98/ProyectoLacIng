import mongoose, { Types } from "mongoose";

const profesorSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    apellido:{
        type: String,
        required: true,
    },
    codigo:{
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{
    timestamps: true,
});

export default mongoose.model("Profesor", profesorSchema);