import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaUserCheck, FaUserPlus, FaSignInAlt, FaChalkboardTeacher, FaLaptop, FaSchool, FaBook, FaUsers, FaBars, FaTimes } from 'react-icons/fa';
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { useState, useEffect } from 'react';

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className='bg-emerald-700 flex justify-between items-center py-3 px-5 lg:px-10 shadow-md'>
                <div className='flex items-center gap-x-4'>
                    <Link to={isAuthenticated ? '/dashboard' : '/'}>
                    <p className='text-white text-lg font-bold'>Universidad Ricardo Palma - Labicing</p>
                    </Link>
                </div>
                <div className='flex items-center gap-x-4'>
                    {isAuthenticated && (
                        <div className='text-white flex items-center gap-x-2'>
                            <FaUser />
                            <span>Bienvenido, {user.username}</span>
                        </div>
                    )}
                    <button className='text-white text-2xl lg:hidden' onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    {isAuthenticated && (
                        <Link
                            className='hidden lg:flex bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md transition duration-300 items-center gap-x-2'
                            to='/'
                            onClick={() => {
                                logout();
                            }}
                        >
                            <FaSignOutAlt />
                            Cerrar Sesión
                        </Link>
                    )}
                </div>
            </div>
            <nav className={`bg-white shadow-md ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                <div className='container mx-auto flex flex-col lg:flex-row justify-center items-center py-5 px-5 lg:px-10'>
                    <ul className='flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 gap-x-4 mt-4 lg:mt-0'>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link
                                        to='/visitante-alumno'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <PiStudentFill />
                                        Visitante Alumno
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link
                                        to='/visitante-profesor'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <GiTeacher />
                                        Visitante Profesor
                                    </Link>
                                </li>*/}
                                <li>
                                    <Link
                                        to='/pc'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <FaLaptop />
                                        PC
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/listado-alumnos'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <FaUsers />
                                        Alumnos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/salon'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <FaSchool />
                                        Salones
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/curso'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <FaBook />
                                        Cursos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/profesor'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <FaChalkboardTeacher />
                                        Profesores
                                    </Link>
                                </li>
                                {isMenuOpen && (
                                    <li>
                                        <Link
                                            className='bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                            to='/'
                                            onClick={() => {
                                                logout();
                                            }}
                                        >
                                            <FaSignOutAlt />
                                            Cerrar Sesión
                                        </Link>
                                    </li>
                                )}
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to='/verificar-alumno'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <FaUserCheck />
                                        Verificar Alumno
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/login'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <FaSignInAlt />
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/registro'
                                        className='text-gray-800 hover:text-emerald-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-x-2'
                                    >
                                        <FaUserPlus />
                                        Registro
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;