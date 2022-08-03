import React, { useState } from 'react'
import CarouselImages from './Carrusel'
import Modal from './Modal'

function Gallery({ img }) {
  const [visible, setVisible] = useState(false)
  const primary = img && img[0]
  const rest = img && img.slice(1)

  return (
    <div className="gallery">

      <div className="primary__img">
        <img src={img && primary.url} alt={img && primary.title} />
      </div>

      <div className="secondary__img">
        {img && rest.map((img, i) => (
          <div className="secondaryImages__wrapper" key={i}>
            <img src={img && img.url} alt={img && img.title} />
          </div>
        ))}

      </div>

      <button className='buttonMore' onClick={() => setVisible(true)}>Ver más</button>

      <Modal visible={visible} onClose={()=>setVisible(false)}>
        <CarouselImages images={img && img} thumbnails={img && img}/>
      </Modal>

    </div>
  )
}

export default Gallery