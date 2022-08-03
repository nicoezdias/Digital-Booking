import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as IconLocation } from 'assets/icon/location.svg';
import { ReactComponent as Back } from 'assets/icon/back.svg'
import { formatParagraph, stringByRank } from 'util/fns'
import { Calendar } from 'react-calendar'
import Button from 'components/atoms/Button'
import Maps from 'components/atoms/Maps'
import { oneHotelById } from 'service/Home'
import Features from 'components/atoms/Features'
import Policy from 'components/atoms/Policy'
import CarouselImages from 'components/atoms/Carrusel'
import Gallery from 'components/atoms/Gallery'
import { UserContext } from 'context/UserContext'
import { useContext } from 'react'


function HotelDetails() {
  const {user} = useContext(UserContext)
  const { innerWidth: width } = window;
  const [hotel, setHotel] = useState({})
  const [contentImg, setContentImg] = useState(()=> window.innerWidth > 1024)
  const location = useLocation()
  const params = useParams().id
  const navigate = useNavigate();

  useEffect(() => {
    loadData(params)
  }, [params])

  useEffect(() => {
  
    const handleSize = ()=>{
      if(window.innerWidth > 768){
        setContentImg(true)
      }
      if(window.innerWidth < 768){
        setContentImg(false)
      }
    }

    window.addEventListener('resize', handleSize)

    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  const loadData = async (id) => {
    const [error, data] = await oneHotelById(id)
    if (error) {
      console.log(error)
      return
    }
    setHotel(data)
    //console.log(data);
    //console.log(new Date(data.disabled[0].arrival));
  }

  const reserveHotels = () => {
    if(!user){
      localStorage.setItem('reserve', location.pathname)
      navigate("/login")
    } else {
      navigate(`reserva`)
    }
    
  }

  const tileDisabledHandler=(date, view)=>{
    if(hotel.disabled){
    const dateDisabled = [...hotel.disabled]
    const dateCalendar = new Date(date).toISOString().split("T")[0]
    return dateDisabled.includes(dateCalendar)
    }
    return
  }

  return (
    <section className='hotels__details'>

      <div className="hotels__details__back">

        <div className="container container--justify-between container--align-center">

          <div className="hotels__details__back__name">
            <p>{hotel.categoryName}</p>
            <h2>{hotel.name}</h2>
          </div>

          <div className='hotels__details__back__button'>
            <Link to="/"><Back /></Link>
          </div>

        </div>

      </div>

      <div className='hotels__details__location'>

        <div className="container container--justify-between container--align-center">

          <div className="hotels__details__location__name">
            <IconLocation/><p>{`${hotel.cityName} a ${hotel.distance && hotel.distance.toFixed(1)} Kilometros del centro`}</p>
          </div>

          <div className='hotels__details__location__rank'>
            <div className="star">
              <p>{hotel.avgRanting ? stringByRank(hotel.avgRanting) : '-'}</p>
              <span>{hotel.stars ? "★".repeat(hotel.stars) : 'Sin calificacion'}</span>
            </div>

            <p>{hotel.avgRanting ? hotel.avgRanting : '0'}</p>
          </div>

        </div>
      </div>

      <div className="hotels__details__collage">
        <div className="container">
          {contentImg ?<Gallery img={hotel.imagesProduct}/> : <CarouselImages images={hotel.imagesProduct}/>}  
        </div>
      </div>

      <div className="hotels__details__description">

        <div className='container container--flex-column'>

          <div className="hotels__details__section">
            <h2 className='hotels__details__description__title'>{hotel.titleDescription}</h2>
            {hotel.description && formatParagraph(hotel.description)}
          </div>

          <div className="hotels__details__section">
            <h2 className='hotels__details__description__title'>¿Qué ofrece este lugar?</h2>
            <hr className='hotels__details__description__separator' />
            <div className='hotels__details__description__features'>
              {hotel.features && hotel.features.map((feature, i) => {
                return (
                  <div key={i}>
                    <Features iconName={feature.icon} /> <p>{feature.name}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        <div className="hotels__details__section calendar">
          <div className="container container--flex-column">

              <h2 className='hotels__details__description__title'>Fechas disponibles</h2>
            <div className='container_calendar'>
              <Calendar
                value={new Date()}
                calendarType='US' // Sunday = 0, Monday = 1, Tuesday = 2, etc.
                view='month'
                minDate={new Date()}
                locale='es-ES'
                navigationLabel={({ date, label, locale, view }) => `${date.toLocaleDateString(locale, { month: 'long' })}`}
                formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' })[0]}
                prev2Label={null} // label for previous month button
                next2Label={null} // label for next month button
                showNeighboringMonth={false} // show previous/next month buttons
                showDoubleView={width > 768 ? true : false} // show two months in view
                selectRange={true} // allow range selection
                showFixedNumberOfWeeks={false}
                tileDisabled={({ date, view }) => tileDisabledHandler(date, view)}
              />
              <div className='hotels__details__description__agendar'>
                <h2 className='hotels__details__description__title__2'>Agregá tus fechas de viaje para obtener precios exactos</h2>

                <Button onClick={reserveHotels} fill text="Iniciar reserva" />

              </div>
            </div>

          </div>
        </div>

        <div className="container container--flex-column">
          <div className="hotels__details__section maps">
            <h2 className='hotels__details__description__title'>¿Cómo llegar?</h2>
            <hr className='hotels__details__description__separator' />
            <p style={{margin: '10px 0'}}>{hotel.cityName}</p>
            <Maps info={hotel}/>
          </div>
        </div>

        <div className="container container--flex-column">
            <h2 className='hotels__details__description__title'>Qué tenés que saber</h2>
            <hr className='hotels__details__description__separator' />
            <div className="container__policy">
              {hotel.policies && <Policy info={hotel.policies}/>}
            </div>
        </div>

      </div>

    </section>
  )
}

export default HotelDetails
