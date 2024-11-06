import mongoose, { Types } from "mongoose";

const salonSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    capacidad:{
        type: Number,
    },
    codigo:{
        type: String,
        
    },
    ubicacion: {
        type: String,
        
    },
    nivel:{
        type: String,
        
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{
    timestamps: true,
});

export default mongoose.model("Salon", salonSchema);