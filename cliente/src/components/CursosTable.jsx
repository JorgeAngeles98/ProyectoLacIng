import React from 'react';

function CursosTable({ cursos }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl mb-4">Cursos Inscritos</h2>
      {cursos.length > 0 ? (
        <table className="min-w-full bg-white text-black">
          <thead>
            <tr>
              <th className="px-4 py-2">Curso</th>
              <th className="px-4 py-2">Salón</th>
              <th className="px-4 py-2">Profesor</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(cursos) && cursos.map((curso, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{curso?.nombre || 'Sin nombre'}</td>
              <td className="px-4 py-2">
                {curso?.salon && curso.salon.length > 0
                  ? curso.salon.map((s) => s.nombre).join('; ')
                  : 'Sin salón asignado'}
              </td>
              <td className="px-4 py-2">
                {curso?.profesor && curso.profesor.length > 0
                  ? curso.profesor.map((p) => `${p.nombre} ${p.apellido}`).join('; ')
                  : 'Sin profesor asignado'}
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      ) : (
        <p className="text-white">No hay cursos inscritos.</p>
      )}
    </div>
  );
}

export default CursosTable;
