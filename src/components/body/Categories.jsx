import {CardCategories} from 'components/atoms/Card'
import React, { useEffect, useState } from 'react'
import { listCategories } from 'service/Home'

function Categories({handleFilter}) {
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async () => {
    const [error,data] = await listCategories()
    if(error){
      console.log(error)
      return
    }
    setCategories(data)
  }
  
  return (
    <section className='categories'>
      <div className='container container--flex-column'>
        <h2 className='categories__title'>Buscar por tipo de alojamiento</h2>
        <div className='categories__container'>
          {categories.map((category,i) => <CardCategories key={i} info={category} handleFilter={handleFilter}/>)}
        </div>
      </div>
    </section>
  )
}

export default Categories