import PropTypes from 'prop-types';
import { useSalon } from '../context/SalonContext';
import { Link } from 'react-router-dom';

function SalonCard({ salon }) {
    const {deleteSalon} = useSalon();


    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className='flex justify-between'>
                <h1 className="text-2xl font-bold">{salon.nombre}</h1>
                <div className='flex gap-x-2 items-center'>
                    <Link  to={`/salon/${salon._id}`}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    >Editar</Link>
                    <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md' 
                        onClick={() => {
                        deleteSalon(salon._id);
                    }}>Eliminar</button>
                </div>
            </header>
            <p className="text-slate-300">{salon.descripcion}</p>
            <p>{new Date(salon.date).toLocaleDateString()}</p>
        </div>
    )
}

SalonCard.propTypes = {
    salon: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
};
export default SalonCard;