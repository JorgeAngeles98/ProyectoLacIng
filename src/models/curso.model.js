import mongoose, { Types } from "mongoose";

const cursoSchema = new mongoose.Schema({
    nombre:{ type: String, required: true },
    codigo:{ type: String, required: true },
    carrera:{ type: String, required: true },
    dateinicio: { type: Date, default: Date.now },
    datefinal: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    salon: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salon' }], // Relación con Salón
    alumnos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alumno' }], // Relación con Alumnos
    profesor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profesor'}], // Relación con Profesor
},{
    timestamps: true,
});

export default mongoose.model("Curso", cursoSchema);