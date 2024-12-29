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

// Nuevo método: Obtener PCs por salón con estado "Operativo" e "Inoperativo"
export const getPcsBySalonOpIno = async (req, res) => {
    try {
        const pcs = await Pc.find({ salon: req.params.id, estado: { $in: ['Operativo', 'Inoperativo'] } }).populate('user').populate('salon');
        res.json(pcs);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Nuevo método: Contar PCs por salón con estado "Operativo" e "Inoperativo"
export const countPcsBySalonOpIno = async (req, res) => {
    try {
        const count = await Pc.countDocuments({ salon: req.params.id, estado: { $in: ['Operativo', 'Inoperativo'] } });
        res.json({ count });
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Nuevo método: Obtener PCs por salón con estado "Dado de baja"
export const getPcsBySalonDDB = async (req, res) => {
    try {
        const pcs = await Pc.find({ salon: req.params.id, estado: 'Dado de baja' }).populate('user').populate('salon');
        res.json(pcs);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Nuevo método: Obtener todas las PCs con estado "Operativo" e "Inoperativo"
export const getPcsActivos = async (req, res) => {
    try {
        const pcs = await Pc.find({ estado: { $in: ['Operativo', 'Inoperativo'] } }).populate('user').populate('salon');
        res.json(pcs);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Nuevo método: Obtener todas las PCs con estado "Dado de baja"
export const getPcsDDB = async (req, res) => {
    try {
        const pcs = await Pc.find({ estado: 'Dado de baja' }).populate('user').populate('salon');
        res.json(pcs);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};