import { ReactComponent as Menu } from 'assets/icon/menu.svg';
import { UserContext } from 'context/UserContext';
import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import DisplayUser from './DisplayUser';
import Social from './Social';

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [menu,setMenu] = useState(false);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      const local = JSON.parse(localStorage.getItem('user'))
      if(local){
        setUser(local)
      }
    }
  },[user,setUser])

  const renderLoginOrSingup = {
    mobile: (url) => {
      switch (url) {
        case "/singup":
          return <Link to="/login" className='nav__link' onClick={openMenu}>Iniciar sesión</Link>
        case "/login":
          return <Link to="/singup" className='nav__link' onClick={openMenu}>Crear cuenta</Link>
        default:
          return (
            <>
              <Link to="/login" className='nav__link' onClick={openMenu}>Iniciar sesión</Link>
              <Link to="/singup" className='nav__link' onClick={openMenu}>Crear cuenta</Link>
            </>
          )
      }
    },
    desktop: (url) => {
      switch (url) {
        case "/singup":
          return <Button type="link" path="/login" text="Iniciar sesión" />
        case "/login":
          return <Button type="link" path="/singup" text="Crear cuenta" />
        default:
          return (
            <>
              <Button type="link" path="/singup" text="Crear cuenta" />
              <Button type="link" path="/login" text="Iniciar sesión" />
            </>
          )
      }
    }
  }

  const openMenu = (e) => {
    setMenu(!menu);
  }

  const handleCloseUser = ()=>{
    setUser(null);
    localStorage.clear();
    navigate("/")
  }

  return (
    <nav>
      <Menu className='toggler__icon' onClick={openMenu}/>
      <div className='nav__devices'>
        {user ? <DisplayUser/> : renderLoginOrSingup.desktop(pathname)}
      </div>
      <NavToggle open={menu} handleMenu={openMenu} controlLink={renderLoginOrSingup.mobile(pathname)} user={user} setUser={handleCloseUser}/>
    </nav>
  )
}

function NavToggle({open, handleMenu, controlLink, user, setUser}) {
  const dropdown = useRef(null);
  

  const clickOutside =(e)=>{
    e.target === dropdown.current && handleMenu();
  }

  const closeUser =(user)=>{
    if(user){
      return (
        <>
          <p className='label_close'>¿Deseas <span onClick={() => {
            setUser(null);
            localStorage.removeItem('user');
          }}>cerrar sesión</span> ? </p>
        </>
      )
    } else {
      return controlLink
    }
  }

  return (
    <div className={open ? "nav__dropdown open" : "nav__dropdown"} onClick={clickOutside} ref={dropdown}>
      <div className="nav__content">

        <div className="nav__content__header">
          <p className='nav_dropdown__close' onClick={handleMenu}>X</p>
          <div className='nav__dropdown__header__user'>
            <h2>{user ? <DisplayUser/> : "MENU"}</h2>
          </div>
        </div>

        <div className="nav__content__body">
          <div className={`nav__content__link ${user&& "login"}`}>
          {closeUser(user)}
          </div>
          <Social/>
        </div>

      </div>
    </div>
  )
}

export default NavBar