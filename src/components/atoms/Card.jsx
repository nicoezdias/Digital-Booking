import { ReactComponent as Location } from 'assets/icon/location.svg';
import { ReactComponent as Like } from 'assets/icon/like.svg';
import React from 'react'
import { stringByRank } from 'util/fns';
import Button from './Button';
import Features from './Features';
import { useContext } from 'react';
import { UserContext } from 'context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { likeHotels } from 'service/Home';
import { useState } from 'react';
import { useEffect } from 'react';

export function CardCategories({info, handleFilter}) {
  const { id, title, urlImage, text_alt, productQuantity} = info

  return (
    <article className='card__categories' onClick={() => handleFilter(id)}>
      <div className='card__categories__img'>
        <img src={urlImage} alt={text_alt}/>
      </div>
      <h3 className='card__categories__title'>{title}</h3>
      <p>{productQuantity} {title}</p>
    </article>
  )
}

export function CardHotels({info}){
  const navigate = useNavigate();
  const location = useLocation()

  const { user} = useContext(UserContext)
  const { like, id, name, categoryName, description, featuresIcons, imageProfile, avgRanting, stars } = info
  const { url, text_alt} = imageProfile


  const [likeHotel, setLikeHotel] = useState(null)

  useEffect(()=>{
    setLikeHotel(like)
  },[like])

  const handleLike = async ()=>{
    if(!user){
      localStorage.setItem('reserve', location.pathname)
      navigate("/login")
    } else {
      const payload = { product: {id: id}, user: {id: user.id}}

      const [error, data, status] = await likeHotels(payload)
      if(error){
        console.log(error);
        return
      }
      if(data){
        setLikeHotel(true)
      }
      if(status === 204){
        setLikeHotel(false)
      }
    }
    
  }

  return (
      <article className='card__hotels'>
      <div className='card__hotels__img'>
        <img src={url && url} alt={text_alt && text_alt}/>
        <button onClick={handleLike} className={likeHotel ? 'card__hotels__img--like like' : 'card__hotels__img--like'}><Like/></button>
      </div>
      <div className="card__hotels__content">
        <div className="card__header">
          <div>
            <p className='card__ranking'>{categoryName.toUpperCase()} <span>{"★".repeat(stars)}</span></p>
            <h3 className='card__title'>{name}</h3>
          </div>
          <div>
            <p className='card__note'>{avgRanting ? avgRanting : 0}</p>
            <p className='card__note__text'>{avgRanting ? stringByRank(avgRanting) : 'Sin puntuación'}</p>
          </div>
        </div>
        <div className="card__info">
          <p className='card__location'><Location/> A 940 m del centro - MOSTRAR EN EL MAPA</p>
          <div className='card__service'>{featuresIcons.map((icon,i) => {
            return <Features key={i} iconName={icon}/>
          })}</div>
        </div>
        <div className="card__body">
          <p className='card__description'>{description}</p>
        </div>
        <Button text="ver más" type="link" fill path={`/products/${id}`}/>
      </div>
    </article>
  )
}

export function CardDetail({info, dateValue, onClick}){

  return (
    <>
    <div className='card__detail'>
      <h2 className='card__detail__title'>Detalle de la reserva</h2>

      <div className='card__detail__father'>

        <div className='card__detail__father__img'>
          <img src={info.productImage && info.productImage.url} alt={info.productImage && info.productImage.text_alt}/>
        </div>

        <div className='card__detail__father__content'>
          <div className='card__detail__father__content__subtitle'>
            <p className='card__detail__father__content__subtitle__category'>{info && info.categoryName}</p>
            <h3 className='card__detail__father__content__subtitle__name'>{info && info.productName}</h3>
            <p className='card__detail__father__content__subtitle__ranking'>★★★★★</p>
          </div>
          <div className='card__detail__father__content__info'>
            <p className='card__detail__father__content__info__location'><Location/>{info && info.productCityName}</p>

            <hr className='card__detail__father__content__info__separator' />

          <div className='card__detail__father__content__checkstime'>
            <p className='card__detail__father__content__checkstime__check'>Check in</p>
            <p className='card__detail__father__content__checkstime__time'>{dateValue ? dateValue[0] : '_/_/_'}</p>
          </div>

            <hr className='card__detail__father__content__info__separator' />

          <div className='card__detail__father__content__checkstime'>
            <p className='card__detail__father__content__checkstime__check'>Check out</p>
            <p className='card__detail__father__content__checkstime__time'>{dateValue ? dateValue[1] : '_/_/_'}</p>
          </div>

            <hr className='card__detail__father__content__info__separator' />

          </div>
          <div className='card__detail__father__content__button'>
            {/* Pau le metes un onClick a esta funcion para que te redirija a la pantalla de resrva realizada */}
            <Button className="card__detail__father__content__button__confirma" fill text="Confirmar reserva" onClick={onClick}/>

          </div>

        </div>
      </div>


      </div>
      </>
    )
}

export function CardDetailBookings({info}){
  const {arrival, departure, categoryName, productName, productStars, productCityName } = info
  // const { url, text_alt } = imageProfile

  
  return (
    <>
    
    <div className='card__detail card__detail__bookings'>
      <h2 className='card__detail__title'>Detalle de la reserva</h2>

      <div className='card__detail__father'>

        <div className='card__detail__father__img'>
          <img src="https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg" alt="hotel.jpg"/>
        </div>

        <div className='card__detail__father__content'>
          <div className='card__detail__father__content__subtitle'>
            <p className='card__detail__father__content__subtitle__category'>{categoryName}</p>
            <h3 className='card__detail__father__content__subtitle__name'>{productName}</h3>
            <p className='card__detail__father__content__subtitle__ranking'>{"★".repeat(productStars)}</p>
          </div>
          <div className='card__detail__father__content__info'>
            <p className='card__detail__father__content__info__location'><Location/>{productCityName}</p>

            <hr className='card__detail__father__content__info__separator' />

          <div className='card__detail__father__content__checkstime'>
            <p className='card__detail__father__content__checkstime__check'>Check in</p>
            <p className='card__detail__father__content__checkstime__time'>{arrival}</p>
          </div>

            <hr className='card__detail__father__content__info__separator' />

          <div className='card__detail__father__content__checkstime'>
            <p className='card__detail__father__content__checkstime__check'>Check out</p>
            <p className='card__detail__father__content__checkstime__time'>{departure}</p>
          </div>

            <hr className='card__detail__father__content__info__separator' />

          </div>
          {/* <div className='card__detail__father__content__button'>
            Pau le metes un onClick a esta funcion para que te redirija a la pantalla de resrva realizada */}
            {/* <Button className="card__detail__father__content__button__confirma" fill text="Confirmar reserva" />

          </div> */}

        </div>
      </div>


      </div>
      
      </>
    )
}
