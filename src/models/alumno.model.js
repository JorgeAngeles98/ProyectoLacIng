import mongoose from "mongoose";

const Schema = mongoose.Schema;
const alumnoSchema = Schema({
    nombreAlu: { type: String, required: true},
    apellidoAlu: {type: String, required: true},
    codigo: { type: String, required: true, unique: true},
    dni: { type: String, required: true, unique: true},
    facultad: {type: String, required: true},
    correoInst: {type: String, required: true, unique: true},
}, {
    timestamps: true,
});

export default mongoose.model("Alumno", alumnoSchema);
