import { Link} from 'react-router-dom';

const Sidebar = () => {



    return(
        <aside className='md:w-60 h-fit px-5 bg-white border-4 drop-shadow-lg rounded-lg'>
            <div className='w-full pb-52 pt-10 '>
            <h3 className=' text-xl text-center pt-8 pb-4 font-bold border-b-2 text-gray-400 drop-shadow-xl mb-12'>Herramientas de Administrador</h3>
            <Link className='p-3 uppercase font-blod block mt-5 text-center border-2 rounded-lg bg-white  text-gray-400 px-2 font-bold hover:cursor-pointer hover:bg-gradient-to-r from-linio-primary to-linio-secondary hover:text-white hover:border-gray-500 hover:drop-shadow-xl transition-colors'  to={"/crear-categorias"}>Crear Categorias</Link>
            <div className='py-4'>
            <Link className='p-3 uppercase font-blod block mt-5 text-center border-2 rounded-lg bg-white  text-gray-400 font-bold hover:cursor-pointer hover:bg-gradient-to-r from-linio-primary to-linio-secondary hover:text-white hover:border-gray-500 hover:drop-shadow-xl transition-colors'  to={"/admin"}>Admin Categorias</Link>
            </div>
            </div>
            
            
        </aside>
    );
}

export default Sidebar;