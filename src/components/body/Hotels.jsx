import { CardHotels } from 'components/atoms/Card'
import React from 'react'

function Hotels({hotels}) {

  return (
    <section className='hotels'>
      <div className='container container--flex-column'>
        <h2 className='hotels__title'>Recomendaciones</h2>
        <div className='hotels__container'>
          {hotels.length > 0 ? hotels.map((hotel,i) => <CardHotels key={i} info={hotel}/>) : <HotelEmpty/>}
        </div>
      </div>
    </section>
  )
}

const HotelEmpty = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', columnSpan: '2'}}>
      <h2 className='hotels__title'>No se ha encontrado ningun hotel</h2>
    </div>
  )
}

export default Hotels