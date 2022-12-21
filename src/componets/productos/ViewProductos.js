import React, { useState, useEffect } from 'react'; 
import { Link, useParams, useNavigate } from 'react-router-dom';
import crud from './../../conexiones/crud';
import swal from 'sweetalert';

export const ViewProductos = ({producto}) => {
    const {nombre, descripcion, stock, precio, imagen} = producto;
    const {idCategoria} = useParams();
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
  
    const cargarProductos = async () => {
      const response = await crud.GET(`/api/producto/${idCategoria}`);
      //console.log(response);
      setProductos(response);
      navigate(`/home-productos/${idCategoria}`)
    }
    useEffect(() => {
      cargarProductos();
    },[]);

    const borrarProducto = async (idProducto)=>{
        console.log(idProducto);
        
        swal({
            title: "¿Estas seguro de eliminar este producto?",
            text: "Una vez eliminado, no se podra recuperar este producto",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                const response = crud.DELETE(`/api/producto/${idProducto}`);
                if (response) {
                    swal("Tu producto ha sido borrada correctamente", {
                        icon: "success",
                    });
                }
                cargarProductos();
                window.location.reload();
            } else {
                swal("Se cancelo la acción");
            }
            });
        }
    return (
        <div className='border-r p-5 flex justify-between item-center' >
            <div className='flex flex-raw items-start'>
                <div className='rounded-full mr-4'>
                    <img className='rounded-full' src={imagen} width="150" height="150" alt=''></img>
                </div>
                <div className='ml-10'>
                    <p className='mb-1 text-xl tex-gray-50'>Nombre:{nombre}</p>
                    <p className='mb-1 text-xl tex-gray-50 uppercase'>Descripcion:{descripcion}</p>
                    <p className='mb-1 text-xl tex-gray-50'>Stock:{stock}</p>
                    <p className='mb-1 text-xl tex-gray-50'>Precio:{precio}</p>
                </div>
                
            </div>
            <div className='flex flex-raw  gap-2'>
            
            <Link className='px-4 hover:scale-90' to={`/actualizar-producto/${producto._id}`}>
                <img src='https://res.cloudinary.com/dhykdpajo/image/upload/v1671568107/Proyecto%20MinTic/edit-regular-60_sbz6yo.png' alt='Editar'></img>
            </Link>&nbsp;&nbsp;

                <button
                    className='px-4 hover:scale-90'
                    onClick={()=>borrarProducto(producto._id)}>
                        <img src='https://res.cloudinary.com/dhykdpajo/image/upload/v1671567820/Proyecto%20MinTic/x-circle-regular-60_eie4ap.png' alt='eliminar'></img>
                    </button>
            </div>
        </div>
    )
}

export default ViewProductos;