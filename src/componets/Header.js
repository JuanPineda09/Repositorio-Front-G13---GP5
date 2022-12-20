import { useNavigate} from 'react-router-dom';


const Header = () => {
    
    const navigate = useNavigate();

    const cerrarSesion = ( ) => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return(
        <header className='px-4 py-2 bg-gradient-to-r from-linio-primary to-linio-secondary rounded-b-xl drop-shadow-xl'> 
        <div className='md:flex md:justify-between'>
        <img className='py-3 rounded-lg ' src='https://res.cloudinary.com/dhykdpajo/image/upload/v1670703164/Proyecto%20MinTic/linio-logo-vector_1_yre6v9.png' alt='Logo Empresa'></img>
            <div className='flex flex-col md:flex row item-center gap-4 pt-3'>



            <input
                type="submit"
                value="Cerrar Sesión"
                className="bg-white mb-5 w-full py-3 text-gray-400 px-2 drop-shadow-lg rounded-lg uppercase font-bold hover:cursor-pointer hover:bg-gradient-to-r from-linio-primary to-linio-secondary hover:text-white hover:border-gray-900 transition-colors"
                onClick={cerrarSesion}/>
            </div>
        </div>
        </header>
    );
}

export default Header;