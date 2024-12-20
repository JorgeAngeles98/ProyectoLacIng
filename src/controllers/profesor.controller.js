import Profesor from "../models/profesor.model.js";

export const getProfesores = async (req, res) => {
    try{
        const profesores = await Profesor.find().populate('user');
        res.json(profesores);
    }catch(error){
        return res.status(500).json({message: "Algo salio mal"});
    }
};

export const getProfesoresActivos = async (req, res) => {
    try {
        const profesoresActivos = await Profesor.find({ estado: "Activo" }).populate('user');
        res.json(profesoresActivos);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" });
    }
};

export const getProfesoresInactivos = async (req, res) => {
    try {
        const profesoresInactivos = await Profesor.find({ estado: "Inactivo" }).populate('user');
        res.json(profesoresInactivos);
    } catch (error) {
        return res.status(500).json({ message: "Algo salio mal" });
    }
};

export const createProfesor = async (req, res) => {
    try{
        const {nombre, apellido, codigo, estado, correo} = req.body;

        const newProfesor = new Profesor({
            nombre,
            apellido,
            codigo,
            correo,
            estado,
            user: req.user.id,
        });
        const savedProfesor = await newProfesor.save();
        res.json(savedProfesor);
    }catch(error){
        return res.status(500).json({message: "Algo salio mal"});
    }
};

export const getProfesor = async (req, res) => {
    try{
        const profesor = await Profesor.findById(req.params.id).populate('user');
        if(!profesor) return res.status(404).json({message: "Profesor no encontrado"});
        res.json(profesor);
    }catch(error){
        return res.status(404).json({message: "Profesor no encontrado"});
    }
};

export const updateProfesor = async (req, res) => {
    try{
        const updatedProfesor = await Profesor.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedProfesor) return res.status(404).json({message: "Profesor no encontrado"});
        res.json(updatedProfesor);
    }catch(error){
        return res.status(404).json({message: "Profesor no encontrado"});
    }
};

export const deleteProfesor = async (req, res) => {
    try{
        const profesor = await Profesor.findByIdAndDelete(req.params.id);
        if(!profesor) return res.status(404).json({message: "Profesor no encontrado"});
        return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message: "Profesor no encontrado"});
    }
};