import React, {useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Admin = () => {

    const navigate = useNavigate();


        useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            //redirecciona a la pagina de inicio si no iene token para autenticar token
            if(!token){
                navigate("/login");
            }
        }
        autenticarUsuario();
        },[navigate]);//Esta anotacion ,[] se usa para que se ejecute una vez el useEffect

    const [categoria, setCategorias] = useState([]);

    const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categoria`);
        setCategorias(response.categoria);
    }

    useEffect(() => {
        cargarCategorias();
    }, [])

    const borrarCategoria = async (idCategoria)=>{
    console.log(idCategoria);
    
    swal({
        title: "¿Estas seguro de eliminar la categoria?",
        text: "Una vez eliminado, no se podra recuperar esta categoria",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            const response = crud.DELETE(`/api/categoria/${idCategoria}`);
            if (response) {
                swal("Tu categoria ha sido borrada correctamente", {
                    icon: "success",
                });
            }
            cargarCategorias();
        } else {
            swal("Se cancelo la acción");
        }
        });
    }
    
    return(
    <>
    <Header/>
    <div className='md:flex md:min-h h-screen'>
    <Sidebar/>
    <main className='flex-1'>
    <h1 className="flex justify-center py-10 bg-gradient-to-r from-linio-primary to-linio-secondary bg-clip-text font-display text-5xl tracking-tight text-transparent">
        Listado de Categorias
    </h1>
    <table className="table table-bordered border-4 mx-10 font-sans drop-shadow-lg">
        <thead className='bg-white border-4'>
            <tr className=''>
                <th className='w-1/4 border-4 text-xl'>Imagen</th>
                <th className='w-1/4 border-4 text-xl'>Nombre</th>
                <th className='w-2/6 border-4 text-xl'>Opciones</th>
            </tr>
        </thead>
        <tbody className="bg-white">
        {categoria.map(item =>
            <tr key={item._id}>
                <td className='border-4 text-center'><img src={item.imagen} alt="imagen categoria"></img></td>
                <td className='border-4 text-center text-xl font-bold '>{item.nombre}</td>
                <td className='border-4 text-center'>
                    <div className='flex justify-center '>
                    <Link className='px-4 hover:scale-90' to={`/home-productos/${item._id}`} >
                        <img src='https://res.cloudinary.com/dhykdpajo/image/upload/v1671568009/Proyecto%20MinTic/add-to-queue-regular-60_a4ioll.png' alt='agregar'></img></Link>&nbsp;&nbsp;
                    <Link className='px-4 hover:scale-90' to={`/actualizar-categoria/${item._id}`}  >
                        <img src='https://res.cloudinary.com/dhykdpajo/image/upload/v1671568107/Proyecto%20MinTic/edit-regular-60_sbz6yo.png' alt='Editar'></img>
                        </Link>&nbsp;&nbsp;
                    <button className='px-4 hover:scale-90' onClick={()=>borrarCategoria(item._id)}>
                        <img src='https://res.cloudinary.com/dhykdpajo/image/upload/v1671567820/Proyecto%20MinTic/x-circle-regular-60_eie4ap.png' alt='eliminar'></img>
                    </button>
                    </div>
                    
                </td>
            </tr>
        )}
        </tbody>
    </table>
    </main>
    </div>
    
    </>
    );
}

export default Admin;