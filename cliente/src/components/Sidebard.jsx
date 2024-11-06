import { FaCog, FaHome, FaPoll, FaRegEnvelope, FaRegFileAlt } from 'react-icons/fa';

const Sidebar = () => {
    return(
        <div className="w-64 bg-gray-800 h-full fixed px-4 py-2">
            <div className='my-2 mb-4'>
                <h1 className="text-2xl text-white font-bold">Admin Dashboard</h1>
            </div>
            <hr />
            <ul className="mt-3 text-white font-bold">
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href="" className='px-3'>
                        <FaHome  className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
                        Inicio    
                    </a>                    
                </li>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href="" className='px-3'>
                        <FaRegFileAlt  className='inline-block w-6 h-6 mr-2 -mt-2'></FaRegFileAlt>
                        Blogs   
                    </a>                    
                </li>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href="" className='px-3'>
                        <FaPoll  className='inline-block w-6 h-6 mr-2 -mt-2'></FaPoll>
                        Salones    
                    </a>                    
                </li>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href="" className='px-3'>
                        <FaRegEnvelope  className='inline-block w-6 h-6 mr-2 -mt-2'></FaRegEnvelope>
                        Inicio    
                    </a>                    
                </li>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href="" className='px-3'>
                        <FaCog  className='inline-block w-6 h-6 mr-2 -mt-2'></FaCog>
                        Configuración   
                    </a>                    
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;