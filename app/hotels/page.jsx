"use client"

import Header from "@components/segments/Header"
import { useEffect, useState } from "react"
import Card from "@components/segments/card"
import DataUtils from "@utils/dataUtils"

const Hotels = () => {
  const [hotels, setHotels] = useState([])

  const fetchHotels = async () => {
    const res = await fetch("/api/trip")
    const data = await res.json();
    console.log(data)

    setHotels(data[0].hotels)
  }

  useEffect(() => {
    fetchHotels();
  }, [])
  
  return (
    <section className="w-full">
      <Header title="Hotels" rightIcon="+" rightIconLink="hotels/add" />
        {hotels?.map((hotel) => (
          <div key={hotel._id} className="mt-4">
            <Card 
              title={hotel?.hotel}
              confirmationNumber={hotel?.confirmationNumber}
              location={`${hotel?.city}, ${hotel?.country}`}
              titleData1="Arrival Date"
              data1={DataUtils.formatLongDate(hotel?.arrivalDate)}
              titleData2="Departure Date"
              data2={DataUtils.formatLongDate(hotel?.departureDate)}
              titleData3="Name on Reservation"
              data3={hotel?.nameOnReservation}
            />
          </div>
        ))}

    </section>
    
  )
}

export default Hotels