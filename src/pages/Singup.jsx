import Button from 'components/atoms/Button';
import Form, { InputPassword } from 'components/atoms/Form'
import { UserContext } from 'context/UserContext';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authSignUp } from 'service/ServiceAuth';
import { validationSignup } from 'util/fns';

function Singup() {
  const [error, setError] = useState({})
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateForm = (data) => {
    const objError = validationSignup(data)
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
    if(validate){
      const [error, data] = await authSignUp(info)
      if(error){
        console.log(error);
        return
      }
      if(data){
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        navigate("/")
      }
    }
  }

  return (
    <div className='content_auth'>
      <div className="container container--flex-column container--align-center container--justify-center">
        <Form onSubmit={onSubmit} className="form singup">

          <h2 className='form_title'>Crear cuenta</h2>

          <div className="form_group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name='name' id='name' className={error.name && "error"}/>
            <p className='form_group_error'>{error.name}</p>
          </div>

          <div className="form_group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" name='surname' id='surname' className={error.surname && "error"}/>
            <p className='form_group_error'>{error.surname}</p>
          </div>

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
          
          <div className="form_group">
            <label htmlFor="passwordConfirm">Contraseña</label>
            <input type="password" name="passwordConfirm" id="passwordConfirm" className={error.passwordConfirm && "error"}/>
            <p className='form_group_error'>{error.passwordConfirm}</p>
          </div>

          <Button type="submit" fill text="Crear cuenta" className="form_buttom"/>
        </Form>
      </div>
    </div>
  )
}

export default Singup