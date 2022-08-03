import Social from 'components/atoms/Social'
import React from 'react'

function Footer() {
  return (
    <footer>
      <div className='container container--justify-between container--align-center'>
        <div className='footer__copy'>
        <p>©2022 Digital Booking</p>
        </div>
        <div className='footer__social'>
        <Social/>
        </div>
      </div>
    </footer>
  )
}

export default Footer