import React, { useState } from 'react';
import crud from '../conexiones/crud';
import swal from 'sweetalert';
import { Link, useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });

  const {email, password} = usuario;

  const onChange = (e) =>{
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }


  const autenticarUsuario = async () =>{
    const data = {
      email: usuario.email,
      password: usuario.password
    }
    console.log(data);
    const response = await crud.POST('/api/auth', data);
    const token = response.token;
    console.log(token);
    const mensaje = response.msg;
    console.log(mensaje);
    if(mensaje === "El usuario no existe"){
      const mensaje = "El usuario no existe";
    swal({
      title:'Error',
      text: mensaje,
      icon: 'error',
      buttons: {
        confirm:{
          text:'OK',
          value: true,
          visible: true,
          className: 'btn btn-danger',
          closeModal: true
        }
      }
    })
    }else if(mensaje === "password incorrecto"){
      const mensaje = "password incorrecto";
      swal({
        title:'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm:{
            text:'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
    }else{
      const jwt = response.token;

      localStorage.setItem('token', jwt);


      console.log(data);
      navigate("/Admin");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    autenticarUsuario();
  }








    return(
    <main className='container mx-auto mt-5 md:mt-12 pt-5 md:flex md:justify-center'>
      <div className='md:w-2/3 lg:w-2/5  border-2 rounded-3xl pt-6 px-4'>
          <Link to={"/"}>
            <img className='hover:scale-90' src='https://res.cloudinary.com/dhykdpajo/image/upload/v1670863094/Proyecto%20MinTic/arrow-back-regular-36_kkhqxf.png' alt='atras'></img>
          </Link>
        
        <h1 className="flex justify-center bg-gradient-to-r from-linio-primary to-linio-secondary bg-clip-text font-display text-5xl tracking-tight text-transparent">INICIAR SESIÓN</h1>
        <form onSubmit={onSubmit} className='my-10 bg-white shadow-orange-500 rounded-lg p-2'>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
            <input
            type="email"
            id="email"
            name="email"
            placeholder="Email de Registro"
            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
            value={email}
            onChange={onChange}
            />
            <label className='uppercase text-gray-600 block text-xl font-bold pt-3'>Password</label>
            <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className='w-full mt-3 p-3 border rounded-lg bg-gray-50 focus:border-pink-500'
            value={password}
            onChange={onChange}
            />
            <div className='pt-5'>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-gradient-to-r from-linio-primary to-linio-secondary mb-5 w-full py-3 text-white font-bold rounded-lg hover:cursor-pointer"/>
              <Link className='block text-center my-0 text-stone-500 text-sm'  to={"/crear-cuenta"}>Crear Cuenta</Link>
            </div>
          </div>
        </form>




      </div>
     </main>
    );
}

export default Login;