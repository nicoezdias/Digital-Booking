import { Link } from 'react-router-dom'
import React from 'react'

function Button({type, text, onClick, path, fill, className, tabIndex}) {

  const linkOrButton = (type)=>{
    fill ? fill=' fill': fill='';
    if(type === 'link'){
      return <Link to={path} className={`button${fill} ${className}`}>{text}</Link>
    } else {
      return <button type={type} onClick={onClick} className={`button${fill} ${className}`} tabIndex={tabIndex}>{text}</button>
    }
  }

  return (
    <>
      {linkOrButton(type)}
    </>
  )
}

export default Button