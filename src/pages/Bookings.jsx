import React, { useEffect, useState } from 'react'
import { listAllBookings } from 'service/Home'
import { CardDetailBookings } from 'components/atoms/Card'

function Bookings() {
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const idUser = JSON.parse(localStorage.getItem('user')).id
        const [error, data] = await listAllBookings(idUser)
        if (error) {
            console.log(error)

            return
        }
        console.log(data)
        setHotels(data)

    }



    return (
        <>

            <section className="contenedor__bookings">
                {hotels.map((hotel, i) => <CardDetailBookings key={i} info={hotel} />)}
            </section>


        </>
    )
}

export default Bookings