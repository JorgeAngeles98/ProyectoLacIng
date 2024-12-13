import Visitante from "../models/visitante.model.js";

export const getVisitantes = async (req, res) => {
    try {
        const visitantes = await Visitante.find().populate('user').populate('salon');
        res.json(visitantes);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createVisitante = async (req, res) => {
    try {
        const { nombre, apellido, codigo, correo, actividad, horaInicio, horaSalida, estado, observacion, pc, rol, salon } = req.body;

        const newVisitante = new Visitante({
            nombre,
            apellido,
            codigo,
            correo,
            actividad,
            horaInicio,
            horaSalida,
            estado,
            observacion,
            pc,
            rol,
            salon,
            user: req.user.id,
        });
        const savedVisitante = await newVisitante.save();
        res.json(savedVisitante);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getVisitante = async (req, res) => {
    try {
        const visitante = await Visitante.findById(req.params.id).populate('user').populate('salon');
        if (!visitante) return res.status(404).json({ message: "Visitante no encontrado" });
        res.json(visitante);
    } catch (error) {
        return res.status(404).json({ message: "Visitante no encontrado" });
    }
};

export const updateVisitante = async (req, res) => {
    try {
        const updatedVisitante = await Visitante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisitante) return res.status(404).json({ message: "Visitante no encontrado" });
        res.json(updatedVisitante);
    } catch (error) {
        return res.status(404).json({ message: "Visitante no encontrado" });
    }
};

export const deleteVisitante = async (req, res) => {
    try {
        const visitante = await Visitante.findByIdAndDelete(req.params.id);
        if (!visitante) return res.status(404).json({ message: "Visitante no encontrado" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Visitante no encontrado" });
    }
};

export const getVisitantesByPc = async (req, res) => {
    try {
        const visitantes = await Visitante.find({ pc: req.params.id }).populate('user').populate('pc');
        res.json(visitantes);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};