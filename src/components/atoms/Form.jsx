import React, { useState } from 'react'
import { ReactComponent as ShowPass } from 'assets/icon/showpass.svg'
import { ReactComponent as HidePass } from 'assets/icon/hiddenpass.svg'

export default function Form({ children, onSubmit, className }) {

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {}
    const form = e.target
    const dataForm = new FormData(form)
    const keys = dataForm.keys()
    for(let i of keys){
      data[i] = dataForm.get(i)
    }
    onSubmit(e, data)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  )
}

export function InputPassword({ name, onChange, id, className }) {
  const [showPass, setShowPass] = useState(false)

  const handleShowPass = () => {
    setShowPass(!showPass)
  }

  return (
    <div className='password_eyes'>
      <input type={showPass ? "text" : "password"} name={name} onChange={onChange} id={id} className={className}/>
      {showPass ? <HidePass onClick={handleShowPass} /> : <ShowPass onClick={handleShowPass} />}
    </div>
  )
}
