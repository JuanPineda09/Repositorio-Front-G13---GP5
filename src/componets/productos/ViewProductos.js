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
            title: "¿Estas seguro de eliminar la categoria?",
            text: "Una vez eliminado, no se podra recuperar esta categoria",
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
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl tex-gray-50'>Nombre:{nombre}</p>
                <p className='mb-1 text-xl tex-gray-50 uppercase'>Descripcion:{descripcion}</p>
                <p className='mb-1 text-xl tex-gray-50'>Stock:{stock}</p>
                <p className='mb-1 text-xl tex-gray-50'>Precio:{precio}</p>
                <img src={imagen} width="150" height="150" alt=''></img>
            </div>
            <div className='flex flex-col lg:flex-row gap-2'>
            <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            <Link to={`/actualizar-producto/${producto._id}`}>Editar</Link>&nbsp;&nbsp;
            </button>
                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={()=>borrarProducto(producto._id)}
                    >Eliminar</button>
            </div>
        </div>
    )
}

export default ViewProductos;