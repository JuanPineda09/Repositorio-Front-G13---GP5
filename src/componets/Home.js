import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import crud from '../conexiones/crud';

const Home = () => {
  const [menuBurger1, setMenuBurger1] = useState("pl-2 hover:scale-75");
  const [menuBurger2, setMenuBurger2] = useState("pl-2 hover:scale-75 hidden");
  const [contenedorOpciones,  setContenedorOpciones] = useState("origin-top-right-bottom absolute right-6 top-16 mt-2 w4-8 hidden");
  const [menuEncendido, setMenuEncendido] = useState(false);

  const desplegarMenu = () => {
    if(!menuEncendido){
      setMenuBurger1("pl-2 hover:scale-75 hidden");
      setMenuBurger2("pl-2 hover:scale-75");
      setContenedorOpciones("origin-top-right-bottom absolute right-6 top-16 mt-2 w4-8");
    } else{
      setMenuBurger1("pl-2 hover:scale-75");
      setMenuBurger2("pl-2 hover:scale-75 hidden");
      setContenedorOpciones("origin-top-right-bottom absolute right-6 top-16 mt-2 w4-8 hidden");
    }
    setMenuEncendido(!menuEncendido)
  }
  
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async ()=>{
    
    const response = await crud.GET(`/api/categoria/home`)
    setCategorias(response.categoria)
    console.log(response.categoria)
  }

  useEffect(() =>{
    cargarCategorias();
  },[]);

  const [productos, setProductos] = useState([]);

  const cargarProductos = async ()=>{
    
    const response = await crud.GET(`/api/producto/home`)
    setProductos(response.producto1)
  }
console.log(productos);
  useEffect(() =>{
    cargarProductos();
  },[]);


  return (
    <>
    <header className="container relative min-w-full text-gray-600 body-font to-transparent  fixed">

        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between bg-gradient-to-r from-linio-primary to-linio-secondary rounded-b-xl drop-shadow-xl">
          <img className='w-35 rounded-lg pt-1' src='https://res.cloudinary.com/dhykdpajo/image/upload/v1670703164/Proyecto%20MinTic/linio-logo-vector_1_yre6v9.png' alt='Logo Empresa'></img> 

          <button className=''>
            <img className={menuBurger1} onClick={desplegarMenu} src='https://res.cloudinary.com/dhykdpajo/image/upload/v1670806515/Proyecto%20MinTic/menu-regular-36_axe90z.png' alt='Menu Hamburguesa Cerrado'></img>
            <img className={menuBurger2} onClick={desplegarMenu} src='https://res.cloudinary.com/dhykdpajo/image/upload/v1670809057/Proyecto%20MinTic/menu-alt-right-regular-36_va1y85.png' alt='Menu Hamburguesa Abierto'></img>
          </button>
        
          <div className={contenedorOpciones} onClick={desplegarMenu}>
              <div className='container rounded-lg items-center bg-gray-100 py-1 px-3 border-2 border-gray-400 border-opacity-50'>
                <Link className='block min-w-full focus:outline-none hover:bg-gray-200 text-base mt-4 md:mt-0 drop-shadow-md'  to={"/login"}>Iniciar Sesion</Link>
                <Link className='block border-t-1 border-gray-400 focus:outline-none hover:bg-gray-200 text-base mt-4 md:mt-0 drop-shadow-md'  to={"/crear-cuenta"}>Crear Cuenta</Link>
              </div>
          </div>
        </div>
      </header>
      <main className='flex-1'>
         <div className="bg-white">
      <div className="py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
          <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
            Todas las Categorias
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
              <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categorias.map((category) => (
                  <a
                    key={category.nombre}
                    href={category.href}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img src={category.imagen} alt="" className="h-full w-full object-cover object-center" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                    />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">{category.nombre}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>


    <div className="bg-gray-500">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Customers also bought</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {productos.map((product) => (
            <div key={product._id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imagen}
                    
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.nombre}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.stock}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.precio}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Add to bag<span className="sr-only">, {product.nombre}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      </main>
      </>
    );
}

export default Home;
  
