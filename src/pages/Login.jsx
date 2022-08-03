import Button from 'components/atoms/Button';
import Form, { InputPassword } from 'components/atoms/Form'
import { UserContext } from 'context/UserContext';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authLogin } from 'service/ServiceAuth';
import { validationLogin } from 'util/fns';

function Login() {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState({})
  const navigate = useNavigate();
  const reserve = localStorage.getItem('reserve')

  const validateForm = (data) => {
    const objError = validationLogin(data)
    if (Object.keys(objError).length === 0) {
      setError({});
      return true
    } else {
      setError(objError);
      return false
    }
  }

  const onSubmit = async (e, info) =>{
    const validate = validateForm(info)
    
    if (validate) {
      const [error, data] = await authLogin(info)
      if(error){
        setError({
          login: "Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde"
        })
      }
      if(data){
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        if(reserve){
          navigate(reserve)
          localStorage.removeItem('reserve')
          return
        }
        navigate("/")
      }
    }
  }

  return (
    <div className='content_auth'>
      <div className="container container--flex-column container--align-center container--justify-center">
        <Form onSubmit={onSubmit} className="form">

          <p className={`message_error ${reserve && 'message_error--show'}`}>{reserve && "El login es obligatorio"}</p>
          <p className={`message_error ${error.login && 'message_error--show'}`}>{error.login && error.login}</p>

          <h2 className='form_title'>Iniciar sesión</h2>

          <div className="form_group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="text" name='email' id='email' className={error.email && "error"}/>
            <p className='form_group_error'>{error.email}</p>
          </div>

          <div className="form_group">
            <label htmlFor="password">Contraseña</label>
            <InputPassword name="password" id="password" className={error.password && "error"}/>
            <p className='form_group_error'>{error.password}</p>
          </div>

          <Button type="submit" fill text="Ingresar" className="form_buttom"/>
        </Form>
      </div>
    </div>
  )
}

export default Login