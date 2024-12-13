import mongoose, { Types } from "mongoose";

const visitanteSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, "El nombre es requerido"] },
    apellido: { type: String, required: [true, "El apellido es requerido"] },
    codigo: { type: String, required: [true, "El documento es requerido"] },
    correo: { type: String, required: [true, "El correo es requerido"] },
    actividad: { type: String, required: [true, "La actividad es requerida"] },
    horaInicio: { type: Date, default: Date.now },
    horaSalida: { type: Date, required: false },
    estado: { type: String, default:"En Curso", required: false },
    observacion: { type: String, required: false },
    rol: { type: String, required: false },
    salon: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salon', required: false }],
    pc: { type: mongoose.Schema.Types.ObjectId, ref: 'Pc', required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
}, {
    timestamps: true,
});

export default mongoose.model("Visitante", visitanteSchema);