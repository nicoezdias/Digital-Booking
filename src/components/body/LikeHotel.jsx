import { CardHotels } from 'components/atoms/Card'
import React from 'react'

function LikeHotel({hotels}) {

  return (
    <section className='hotels'>
      <div className='container container--flex-column'>
        <h2 className='hotels__title'>Favoritos</h2>
        <div className='hotels__container'>
          {hotels.map((hotel,i) => <CardHotels key={i} info={hotel}/>)}
        </div>
      </div>
    </section>
  )
}

export default LikeHotel