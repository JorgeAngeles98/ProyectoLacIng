import { usePc } from '../context/PcContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PCCard from '../components/PCCard';
import { FaPlus, FaEye, FaTrashAlt } from 'react-icons/fa';

function PcsBySalonPage() {
  const { getPcsBySalon, pcs } = usePc();
  const params = useParams();
  const [showDadasDeBaja, setShowDadasDeBaja] = useState(false);

  useEffect(() => {
    getPcsBySalon(params.id);
  }, [params.id]); // Asegúrate de que getPcsBySalon solo se llame una vez cuando el componente se monta

  const alphanumericSort = (a, b) => {
    const regex = /(\d+)|(\D+)/g;
    const aParts = a.match(regex);
    const bParts = b.match(regex);

    while (aParts.length && bParts.length) {
      const aPart = aParts.shift();
      const bPart = bParts.shift();

      const aIsNum = !isNaN(aPart);
      const bIsNum = !isNaN(bPart);

      if (aIsNum && bIsNum) {
        const diff = parseInt(aPart, 10) - parseInt(bPart, 10);
        if (diff !== 0) return diff;
      } else if (aIsNum) {
        return -1;
      } else if (bIsNum) {
        return 1;
      } else {
        const diff = aPart.localeCompare(bPart);
        if (diff !== 0) return diff;
      }
    }

    return aParts.length - bParts.length;
  };

  const filteredPcs = pcs
    .filter(pc => showDadasDeBaja ? pc.estado === 'Dado de baja' : pc.estado !== 'Dado de baja')
    .sort((a, b) => alphanumericSort(a.nombre, b.nombre)); // Ordenar alfanuméricamente por nombre

  return (
    <div>
      <div className="py-6 flex justify-center gap-4">
        <Link to={`/registrar-pc/${params.id}?mode=create`} className='bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 rounded-sm text-2xl font-bold flex items-center gap-2'>
          <FaPlus /> Agregar PC
        </Link>
        <button onClick={() => setShowDadasDeBaja(!showDadasDeBaja)} className='bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-sm text-2xl font-bold flex items-center gap-2'>
          {showDadasDeBaja ? <><FaEye /> Ver PCs Activas</> : <><FaTrashAlt /> Ver PCs Dadas de Baja</>}
        </button>
      </div>

      {filteredPcs.length === 0 ? (
        <h1>No hay PC's</h1>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          {filteredPcs.map((pc) => (
            <PCCard pc={pc} key={pc._id} link={`/pcporsalon/${pc._id}`} mensaje="Número de PC's: 21" />
          ))}
        </div>
      )}
    </div>
  );
}

export default PcsBySalonPage;