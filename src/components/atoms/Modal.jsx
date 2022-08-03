import React from 'react'

function Modal({children, visible, onClose}) {
  return (

    <div className={`modal ${visible ? 'modal--open' : ''}`}>
      
      <div className='modal_content'>

        <button className='button_close' onClick={onClose}>X</button>
        {children}
        
      </div>

    </div>

  )
}

export default Modal