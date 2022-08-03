import Button from "components/atoms/Button";
import { ReactComponent as Confirm } from 'assets/icon/confirm.svg';

import { useNavigate } from 'react-router-dom';


export function BookingConfirm() {
  
  const navigate = useNavigate();
    return (
      <>
      <div className="container_confirmation">
      <div className="card_confirmation">
        <div className="card_confirmation_content">
           <Confirm/>
            <h4>¡Muchas gracias!</h4>
            <p>Su reserva se ha realizado con éxito</p> 
            <Button fill text="ok" onClick={ () => {
              navigate("/")
            }} />
              
        </div>
      </div>
      </div>
      </>
    )
  }

  export function LoginAgain(){
    const navigate = useNavigate();
    return (
      <>
      <div className="container_confirmation">
      <div className="card_confirmation">
        <div className="card_confirmation_content">
            <h1>Reinicie su sesión por favor</h1>
            <Button className="card__detail__father__content__button__confirma" fill text="ok" onClick={ () => {
              navigate("/")
            }} />
              
        </div>
      </div>
      </div>
      </>
    )
  }