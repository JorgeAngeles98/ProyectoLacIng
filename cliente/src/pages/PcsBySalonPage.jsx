import { usePc } from '../context/PcContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PCCard from '../components/PCCard';

function PcPage() {
  const { getPcsBySalon, pcs } = usePc();
  const params = useParams();

  useEffect(() => {
    getPcsBySalon(params.id);
  }, []);

  return (
    <div>
            <div className="py-6 flex justify-center">
                <Link to={`/registrar-pc/${params.id}?mode=create`} className='bg-emerald-700 hover:bg-emerald-800 text-white w-full py-3 rounded-sm text-2xl font-bold text-center'>
                    Agregar PC
                </Link>
            </div>

        {pcs.length === 0 ? (
            <h1>No hay PC's</h1>
        ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-5">
                {pcs.map((pc) => (
                    <PCCard pc={pc} key={pc._id} link={`/pcporsalon/${pc._id}`} mensaje="Número de PC's: 21" />
                ))}
            </div>
        )}
    </div>
  );
}

export default PcPage;