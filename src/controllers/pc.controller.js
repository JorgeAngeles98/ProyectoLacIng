import Pc from "../models/pc.model.js";

export const getPcs = async (req, res) => {
    try {
        const pcs = await Pc.find().populate('user').populate('salon');
        res.json(pcs);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createPc = async (req, res) => {
    try {
        const { marca, serial, numpatrimonio, nombre, estado, observacion, salon } = req.body;

        const newPc = new Pc({
            marca,
            serial,
            numpatrimonio,
            nombre,
            estado,
            observacion,
            user: req.user.id,
            salon,
        });
        const savedPc = await newPc.save();
        res.json(savedPc);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getPc = async (req, res) => {
    try {
        const pc = await Pc.findById(req.params.id).populate('user').populate('salon');
        if (!pc) return res.status(404).json({ message: "PC no encontrada" });
        res.json(pc);
    } catch (error) {
        return res.status(404).json({ message: "PC no encontrada" });
    }
};

export const updatePc = async (req, res) => {
    try {
        const updatedPc = await Pc.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPc) return res.status(404).json({ message: "PC no encontrada" });
        res.json(updatedPc);
    } catch (error) {
        return res.status(404).json({ message: "PC no encontrada" });
    }
};

export const deletePc = async (req, res) => {
    try {
        const pc = await Pc.findByIdAndDelete(req.params.id);
        if (!pc) return res.status(404).json({ message: "PC no encontrada" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "PC no encontrada" });
    }
};

export const getPcsBySalon = async (req, res) => {
    try {
        const pcs = await Pc.find({ salon: req.params.id }).populate('user').populate('salon');
        res.json(pcs);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};