import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <div>
            <div className='bg-emerald-700 flex justify-between py-1 px-10'>
                <p className=' text-2xs font-bold'>Universidad Ricardo Palma</p>

                <ul className='flex gap-x-2'>{isAuthenticated ? (
                    <>
                        <li>
                            Bienvenido {user.username}
                        </li>
                        <li>
                            <Link className='bg-red-600 hover:bg-red-800 px-4 py-1 rounded-sm' to='/' onClick={() => {
                                logout();
                            }}>Cerrar Sesion</Link>
                        </li>

                    </>
                ) : (
                    <>
                    </>
                )}
                </ul>
            </div>
            <nav className='bg-white flex justify-between py-5 px-10'>

                <Link to={
                    isAuthenticated ? '/salon' : '/'
                }><h1 className='text-gray-800 text-2xl font-bold'>Lacing 2024</h1></Link>

                <ul className='flex gap-x-2'>{isAuthenticated ? (
                    <>
                        <li>
                            <Link to='/salon' className='bg-emerald-800 hover:bg-emerald-950 px-4 py-1 rounded-sm'>Salones</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login' className='bg-emerald-800 hover:bg-emerald-950 px-4 py-1 rounded-sm'>Login</Link>
                        </li>
                        <li>
                            <Link to='/registro' className='bg-emerald-800 hover:bg-emerald-950 px-4 py-1 rounded-sm'>Registro</Link>
                        </li>
                    </>
                )}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;