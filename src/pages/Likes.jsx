import LikeHotel from 'components/body/LikeHotel'
import React, { useEffect, useState } from 'react'
import { listAllLikes } from 'service/Home'

function Likes() {
  const [hotels, setHotels] = useState([])

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async () => {
    const idUser = JSON.parse(localStorage.getItem('user')).id
    const [error,data] = await listAllLikes(idUser)
    if(error){
      console.log(error)

      return
    }
    setHotels(data)
   
  }


  
  return (
    <>
      <LikeHotel hotels={hotels}/>
    
    </>
  )
}

export default Likes