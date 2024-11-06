import Salon from "../models/salon.model.js";

export const getSalones = async (req, res) => {
    try {
        const salones = await Salon.find().populate('user');
        res.json(salones);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" });
    }

};

export const createSalon = async (req, res) => {
    try {
        const { nombre, descripcion, date, capacidad, codigo, ubicacion, nivel } = req.body;

        const newSalon = new Salon({
            nombre,
            descripcion,
            date,
            capacidad,
            codigo,
            ubicacion,
            nivel,
            user: req.user.id,
        });
        const savedSalon = await newSalon.save();
        res.json(savedSalon);

    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" });
    }

};

export const getSalon = async (req, res) => {
    try {
        const salon = await Salon.findById(req.params.id).populate('user');
        if (!salon) return res.status(404).json({ message: "Salon no encontrado" });
        res.json(salon);
    } catch (error) {
        return res.status(404).json({ message: "Salon no encontrado" });
    }

};

export const updateSalon = async (req, res) => {
    try {
        const updatedSalon = await Salon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSalon) return res.status(404).json({ message: "Salon no encontrado" })
        res.json(updatedSalon);
    } catch (error) {
        return res.status(404).json({ message: "Salon no encontrado" });
    }

};

export const deleteSalon = async (req, res) => {
    try {
        const salon = await Salon.findByIdAndDelete(req.params.id);
        if (!salon) return res.status(404).json({ message: "Salon no encontrado" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Salon no encontrado" });
    }

};