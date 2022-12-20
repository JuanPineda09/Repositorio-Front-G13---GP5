import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CrearCuenta from './componets/CrearCuenta';
import Admin from './componets/Admin';
import Login from './componets/Login';
import Home from './componets/Home';
import CrearCategoria from './componets/CrearCategoria';
import ActualizarCategoria from './componets/ActualizarCategoria';
import HomeProductos from './componets/productos/HomeProductos';
import CrearProducto from './componets/productos/CrearProducto';
import ActualizarProducto from './componets/productos/ActualizarProductos';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/crear-cuenta" exact element={<CrearCuenta/>} />
        <Route path="/admin" exact element={<Admin/>} />
        <Route path="/crear-categorias" exact element={<CrearCategoria/>} />
        <Route path="/actualizar-categoria/:idCategoria" exact element={<ActualizarCategoria/>} />
        <Route path="/actualizar-producto/:idProducto" exact element={<ActualizarProducto/>} />
        <Route path="/home-productos/:idCategoria" exact element={<HomeProductos/>} />
        <Route path="/crear-producto/:idCategoria" exact element={<CrearProducto/>} />
      </Routes>
    </Router>
  );
}

export default App;