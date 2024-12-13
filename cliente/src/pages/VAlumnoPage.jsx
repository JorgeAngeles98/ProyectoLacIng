import { useSalon } from '../context/SalonContext';
import { useEffect } from 'react';
import SVCard from '../components/SVCard';

function VAlumnoPage() {
  const { getSalones, salones } = useSalon();

  useEffect(() => {
    getSalones();
  }, []);

  return (
    <div>
        {salones.length === 0 ? (
            <h1>No hay salones</h1>
        ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-5">
                {salones.map((salon) => (
                    console.log(salon),
                    <SVCard salon={salon} key={salon._id} link={`/visitante-alumno/salon/${salon._id}`} mensaje="" />
                ))}
            </div>
        )}
    </div>
  );
}

export default VAlumnoPage;