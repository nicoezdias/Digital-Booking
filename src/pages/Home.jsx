import Categories from 'components/body/Categories'
import Hotels from 'components/body/Hotels'
import Search from 'components/body/Search'
import React, { useEffect, useState } from 'react'
import { filterByCategory, filterByCity, listAllHotels } from 'service/Home'

function Home() {
  const [hotels, setHotels] = useState([])

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async () => {
    const [error,data] = await listAllHotels()
    if(error){
      console.log(error)
      return
    }
    setHotels(data)
  }

  const filterHotelsByCategory = async (id) => {
    const [error,data] = await filterByCategory(id)
    if(error){
      console.log(error)
      return
    }
    setHotels(data)
  }

  const filterHotelsByCity = async (city) => {
    const payload = city
    const dates = payload.date.split(" - ")
    payload['arrival'] = dates[0].split("/").reverse().join("-")
    payload['departure'] = dates[1].split("/").reverse().join("-")
    console.log(payload);
    const [error,data] = await filterByCity(payload)
    if(error){
      console.log(error)
      return
    }
    setHotels(data)
  }
  
  return (
    <>
      <Search handleFilter={filterHotelsByCity}/>
      <Categories handleFilter={filterHotelsByCategory}/>
      <Hotels hotels={hotels}/>
    </>
  )
}

export default Home