import React, {useEffect, useState} from 'react';
import crud from './../../conexiones/crud';
import Header from '../Header';
import Sidebar from '../Sidebar';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';

const ActualizarProducto = () => {

    const navigate = useNavigate();

    const {idProducto} = useParams();

    const [producto, setProducto] = useState({
        nombre:'',
        descripcion:'',
        stock:'',
        precio:'',
        imagen:''
    });

    

    const cargarProducto = async () =>{
        const response = await crud.GET(`/api/producto/productos/${idProducto}`);
        setProducto(response.producto1);
    }

    const { nombre, descripcion, stock, precio, imagen } = producto;

    console.log(producto);
    const onChange = (e) =>{
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }



    useEffect(()=>{
        cargarProducto();
    },[]);

    
    

    const ActualizarProducto = async () =>{
        const data = {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            stock: producto.stock,
            precio: producto.precio,
            imagen: producto.imagen
        }
    const response = await crud.PUT(`/api/producto/${idProducto}`, data);
    console.log(response);
    const mensaje1 = "El producto se ha actualizado correctamente"
    swal({
        title:'Información',
        text: mensaje1,
        icon: 'success',
        buttons: {
          confirm:{
            text:'OK',
            value: true,
            visible: true,
            className: 'btn btn-primary',
            closeModal: true
          }
        }
      });
    navigate("/admin");
    }
    
    
    const onSubmit = (e) => {
        e.preventDefault();
        ActualizarProducto();
    }


    
    

    return(
        <>
        <Header/>
        <div className='md:flex md:min-h h-screen'>
        <Sidebar/>
        <main className='flex-1'>
            <div className='mt-10 flex justify-center'>
                <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    Actualizar Producto
                    </h1>
            </div>
        
        <form onSubmit={onSubmit} className='my-10 bg-white shadow-orange-500 rounded-lg p-10'>
        <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
                Nombre del producto
            </label>
            <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
            value={nombre}
            onChange={onChange}
            />
            <label className='uppercase text-gray-600 block text-xl font-bold'>
                Descripcion del producto
            </label>
            <input
            type="text"
            id="descripcion"
            name="descripcion"
            placeholder="Descripcion"
            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
            value={descripcion}
            onChange={onChange}
            />
            <label className='uppercase text-gray-600 block text-xl font-bold'>
                Stock del Producto
            </label>
            <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Stock"
            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
            value={stock}
            onChange={onChange}
            />
            <label className='uppercase text-gray-600 block text-xl font-bold'>
                Precio del Producto
            </label>
            <input
            type="number"
            id="precio"
            name="precio"
            placeholder="Precio"
            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
            value={precio}
            onChange={onChange}
            />
            <label className='uppercase text-gray-600 block text-xl font-bold'>
                Imagen del Producto
            </label>
            <input
            type="text"
            id="imagen"
            name="imagen"
            placeholder="imagen"
            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
            value={imagen}
            onChange={onChange}
            />
            <input
            type="submit"
            value="Actualizar Producto"
            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
        </div>
        </form>
            <div>
                
            </div>
        
        </main>
        </div>
        </>
    );
}

export default ActualizarProducto;