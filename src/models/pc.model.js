import mongoose from 'mongoose';

const pcSchema = new mongoose.Schema({
    marca: { type: String, required: [true, "La marca es requerida"] },
    serial: { type: String, required: [true, "El número de serie es requerido"] },
    numpatrimonio: { type: String, required: [true, "El número de patrimonio es requerido"] },
    nombre: { type: String, required: [true, "El nombre de la máquina es requerido"] },
    estado: { type: String, required: [true, "El estado es requerido"], default: "Disponible" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    salon: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salon' }],
    observacion: { type: String, required: false },
}, {
    timestamps: true,
});

export default mongoose.model("Pc", pcSchema);