import Alumno from "../models/alumno.model.js";
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
        res.json(savedAlumno);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        else return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getAlumno = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });
        res.json(alumno);
    } catch (error) {
        return res.status(404).json({ message: "Alumno no encontrado" });
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
        const alumno = await Alumno.findByIdAndDelete(req.params.id);
        if (!alumno) return res.status(404).json({ message: "Alumno no encontrado" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Alumno no encontrado" });
    }
};
