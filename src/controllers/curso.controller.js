import Curso from "../models/curso.model.js";

export const getCursos = async (req, res) => {
    try{
        const cursos = await Curso.find().populate('user');
        res.json(cursos);
    }catch(error){
        return res.status(500).json({message: "Algo salio mal"});
    }
};

export const createCurso = async (req, res) => {
    try{
        const {nombre, codigo, carrera, dateinicio, datefinal} = req.body;

        const newCurso = new Curso({
            nombre,
            codigo,
            carrera,
            dateinicio,
            datefinal,
            user: req.user.id,
        });
        const savedCurso = await newCurso.save();
        res.json(savedCurso);
    }catch(error){
        return res.status(500).json({message: "Algo salio mal"});
    }
};

export const getCurso = async (req, res) => {
    try{
        const curso = await Curso.findById(req.params.id).populate('user');
        if(!curso) return res.status(404).json({message: "Curso no encontrado"});
        res.json(curso);
    }catch(error){
        return res.status(404).json({message: "Curso no encontrado"});
    }
};

export const updateCurso = async (req, res) => {
    try{
        const updatedCurso = await Curso.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedCurso) return res.status(404).json({message: "Curso no encontrado"});
        res.json(updatedCurso);
    }catch(error){
        return res.status(404).json({message: "Curso no encontrado"});
    }
};

export const deleteCurso = async (req, res) => {
    try{
        const curso = await Curso.findByIdAndDelete(req.params.id);
        if(!curso) return res.status(404).json({message: "Curso no encontrado"});
        return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message: "Curso no encontrado"});
    }
};