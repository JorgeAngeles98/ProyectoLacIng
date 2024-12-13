import { usePc } from '../context/PcContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PCCard2 from '../components/PCCard2';

function VAlumnoSalonPage() {
  const { getPcsBySalon, pcs } = usePc();
  const params = useParams();

  useEffect(() => {
    getPcsBySalon(params.id);
  }, []);

  return (
    <div>
        {pcs.length === 0 ? (
            <h1>No hay PC's</h1>
        ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-5 pt-5">
                {pcs.map((pc) => (
                    <PCCard2 pc={pc} key={pc._id} link={`/pcporsalon/${pc._id}`} mensaje="Número de PC's: 21" />
                ))}
            </div>
        )}
    </div>
  );
}

export default VAlumnoSalonPage;