import { useSalon } from '../context/SalonContent';
import { useEffect } from 'react';
import SalonCard from '../components/SalonCard';
import { Link } from 'react-router-dom';

function SalonesPage() {
  const { getSalones, salones } = useSalon();

  useEffect(() => {
    getSalones();
  }, [])

  if (salones.length === 0) return (<h1>No hay Tareas</h1>)

  return (
    <div>
      <div className='py-6 flex justify-center'>
        <Link to='/agregar-salon' className='bg-indigo-500 w-full py-3 rounded-sm text-2xl font-bold text-center'>Agregar Salon</Link>
      </div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
        {salones.map((salon) => (
          <SalonCard salon={salon} key={salon._id} />
        ))}
      </div>
    </div>

  );
}

export default SalonesPage;