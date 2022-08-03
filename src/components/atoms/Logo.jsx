import { ReactComponent as Icon } from 'assets/icon/logo.svg';
import { Link } from 'react-router-dom'
import React from 'react'

function Logo() {
  return (
    <div className="brand">
      <Link to="/" className='brand__link'>
        <Icon className='brand__icon' />
        <p className='brand__slogan'>Sentite como en tu hogar</p>
      </Link>
    </div>
  )
}

export default Logo