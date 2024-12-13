import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SVCard({ salon, link, mensaje }) {
    return (
        <div className="pt-5">
            <div className="bg-white max-w-md w-full p-10 rounded-md">
                <header className='flex justify-between'>
                    <Link to={link}
                        className='bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-md'
                    >
                        <h1 className="text-2xl font-bold">{salon.nombre}</h1>
                    </Link>
                </header>
                <p className="text-black pt-5">{mensaje}</p>
            </div>
        </div>
    );
}

SVCard.propTypes = {
    salon: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
    link: PropTypes.string.isRequired,
};

export default SVCard;