import { ReactComponent as IconLocation2 } from 'assets/icon/location2.svg';
import { ReactComponent as IconLocation } from 'assets/icon/location.svg';
import { InputCalendar, TextSuggestion } from 'components/atoms/inputs';
import React, { useEffect, useState } from 'react'
import Button from 'components/atoms/Button';
import { listCity } from 'service/Home';
import Form from 'components/atoms/Form';

function Search({handleFilter}) {
  const [cities, setCities] = useState([])
  const [id, setId] = useState(0)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [error,data] = await listCity()
    if(error){
      console.log(error)
      return
    }
    setCities(data)
  }

  const filter =(e, data)=>{
    handleFilter(data)
  }


  return (
    <div className='search'>
      <div className="container container--justify-center container--flex-column">
        <h2 className='search__tittle'>Busca ofertas en hoteles, casas y mucho más</h2>
        <Form className='search__form' onSubmit={filter}>
          <TextSuggestion Icon={IconLocation} IconItem={IconLocation2} placeholder="¿A dónde vamos?" cities={cities} id={id} idCity={id} setIdCity={setId}/>
          <InputCalendar />
          <Button text="Buscar" fill type="submit"/>
        </Form>
      </div>
    </div>
  )
}

export default Search