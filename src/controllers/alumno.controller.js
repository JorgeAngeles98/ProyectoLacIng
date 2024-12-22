import Alumno from "../models/alumno.model.js";
import Curso from '../models/curso.model.js';
import { z } from 'zod';

export const getAlumnos = async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createAlumno = async (req, res) => {
    try {
        const { nombreAlu, apellidoAlu, codigo, dni, facultad, correoInst } = req.body;

        const newAlumno = new Alumno({
            nombreAlu,
            apellidoAlu,
            codigo,
            dni,
            facultad,
            correoInst,
        });

        const savedAlumno = await newAlumno.save();
        res.status(201).json(savedAlumno);

    } catch (error) {
        const errors = [];
        // Verificar si es un error de duplicados (MongoDB error code 11000)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            errors.push({ message: `El campo ${field} ya está en uso. Debe ser único.` });
        }

        if (error instanceof z.ZodError) {
            error.errors.forEach((zodError) => {
                errors.push({ message: zodError.message });
            });
        }
        // Si hay errores acumulados, enviarlos
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        res.status(500).json({ message: "Algo salió mal", error });
    }

};

export const getAlumno = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });
        // Buscar los cursos en los que está inscrito y poblar la información del salón
        const cursos = await Curso.find({ alumnos: alumno._id }).populate('salon').populate('profesor','nombre apellido');
        return res.json({
            alumno,
            cursos
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la información', error });
    }
};

export const getAlumnoPorCodigo = async (req, res) => {
    try {
        const { codigo } = req.params;
        const alumno = await Alumno.findOne({ codigo });
        if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });

        const cursos = await Curso.find({ alumnos: alumno._id })
            .populate('salon')
            .populate('profesor', 'nombre apellido');

        return res.json({
            alumno,
            cursos,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener la información', error });
    }
};

export const updateAlumno = async (req, res) => {
    try {
        const updatedAlumno = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAlumno) return res.status(404).json({ message: "Alumno no encontrado" });
        res.json(updatedAlumno);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        else return res.status(404).json({ message: "Alumno no encontrado" });
    }
};

export const deleteAlumno = async (req, res) => {
    try {
        const alumnoId = req.params.id;

        const alumno = await Alumno.findById(alumnoId);
        if (!alumno) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }

        const cursos = await Curso.find({ alumnos: alumnoId });
        for (const curso of cursos) {
            curso.alumnos = curso.alumnos.filter(
                (alumno) => alumno.toString() !== alumnoId
            );
            await curso.save();
        }
        await Alumno.findByIdAndDelete(alumnoId);

        res.status(200).json({ message: "Alumno eliminado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el alumno", error });
    }
};
