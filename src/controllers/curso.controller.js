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
        const curso = await Curso.findById(req.params.id)
        .populate('user')
        .populate('salon', 'nombre')
        .populate('profesor', 'nombre apellido');
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

// Controladores de Alumno
export const matricularAlumno = async (req, res) => {
    try {
      const { cursoId, alumnoId } = req.body;
  
      // Verificar si ya está matriculado
      const curso = await Curso.findById(cursoId);
      if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
  
      if (curso.alumnos.includes(alumnoId)) {
        return res.status(400).json({ message: 'El alumno ya está matriculado en este curso' });
      }
  
      // Agregar el alumno al curso
      curso.alumnos.push(alumnoId);
      await curso.save();
  
      res.status(200).json({ message: 'Alumno matriculado con éxito', curso });
    } catch (error) {
      res.status(500).json({ message: 'Error al matricular alumno', error });
    }
};

export const eliminarAlumnodeCurso = async (req, res) => {
    try {
      const { cursoId, alumnoId } = req.body;
  
      // Verificar si el curso existe
      const curso = await Curso.findById(cursoId);
      if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
  
      // Verificar si el alumno está matriculado
      if (!curso.alumnos.includes(alumnoId)) {
        return res.status(400).json({ message: 'El alumno no está matriculado en este curso' });
      }
  
      // Eliminar al alumno del curso
      curso.alumnos = curso.alumnos.filter(alumno => alumno.toString() !== alumnoId);
      await curso.save();
  
      res.status(200).json({ message: 'Alumno eliminado del curso con éxito', curso });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar alumno', error });
    }
};

// Controladores de Profesor
export const asignarProfesor = async (req, res) => {
    try {
      const { cursoId, profesorId } = req.body;
  
      // Verificar si ya está asignado
      const curso = await Curso.findById(cursoId);
      if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
  
      if (curso.profesor.includes(profesorId)) {
        return res.status(400).json({ message: 'El profesor ya está asignado a este curso' });
      }
  
      // Agregar profesor al curso
      curso.profesor.push(profesorId);
      await curso.save();
  
      res.status(200).json({ message: 'Profesor asignado con éxito', curso });
    } catch (error) {
      res.status(500).json({ message: 'Error al asignar profesor', error });
    }
};

export const eliminarProfesordeCurso = async (req, res) => {
    try {
      const { cursoId, profesorId } = req.body;
  
      // Verificar si el curso existe
      const curso = await Curso.findById(cursoId);
      if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
  
      // Verificar si el profesor está asignado al curso
      if (!curso.profesor.includes(profesorId)) {
        return res.status(400).json({ message: 'El profesor no está asignado a este curso' });
      }
  
      // Eliminar al alumno del curso
      curso.profesor = curso.profesor.filter(profesor => profesor.toString() !== profesorId);
      await curso.save();
  
      res.status(200).json({ message: 'Profesor eliminado del curso con éxito', curso });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar profesor del curso', error });
    }
};

// Controladores de Salon
export const asignarSalon = async (req, res) => {
    try {
      const { cursoId, salonId } = req.body;
  
      // Verificar si ya está asignado
      const curso = await Curso.findById(cursoId);
      if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
  
      if (curso.salon.includes(salonId)) {
        return res.status(400).json({ message: 'El salón ya está asignado a este curso' });
      }
  
      // Agregar salon al curso
      curso.salon.push(salonId);
      await curso.save();
  
      res.status(200).json({ message: 'Salón asignado con éxito', curso });
    } catch (error) {
      res.status(500).json({ message: 'Error al asignar profesor', error });
    }
};

export const eliminarSalondeCurso = async (req, res) => {
    try {
      const { cursoId, salonId } = req.body;
  
      // Verificar si el curso existe
      const curso = await Curso.findById(cursoId);
      if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
  
      // Verificar si el salón está asignado al curso
      if (!curso.salon.includes(salonId)) {
        return res.status(400).json({ message: 'El salón no está asignado a este curso' });
      }
  
      // Eliminar el salón asignado del curso
      curso.salon = curso.salon.filter(salon => salon.toString() !== salonId);
      await curso.save();
  
      res.status(200).json({ message: 'Salón eliminado del curso con éxito', curso });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar salón asignado del curso', error });
    }
};
  
  