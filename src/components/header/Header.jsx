import Logo from 'components/atoms/Logo'
import NavBar from 'components/atoms/NavBar'
import React from 'react'
import { useLocation } from 'react-router-dom';

function Header() {
  const pathname = useLocation().pathname;
  
  return (
    <header>
      <div className="container container--justify-between">
        <Logo/>
        {pathname === '/LoginConfirm' ? '' : <NavBar/>}
      </div>
    </header>
  )
}

export default Header