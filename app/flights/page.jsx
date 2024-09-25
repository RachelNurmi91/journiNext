"use client"

import { useEffect, useState } from "react"
import Card from "@components/segments/card"
import Header from "@components/segments/Header"

const Flights = () => {
  const [flights, setFlights] = useState([])

  const fetchFlights = async () => {
    const res = await fetch("/api/trip")
    const data = await res.json();

    setFlights(data[0].flights)
  }

  useEffect(() => {
    fetchFlights();
  }, [])
  
  return (
    <section className="w-full">
      <Header title="Flights" rightIcon="+" rightIconLink="flights/add" />
        {flights?.map((flight) => (
          <div key={flight._id} className="mt-4">
            <Card 
              title={flight?.airline}
              confirmationNumber={flight?.confirmationNumber}
              titleData1="Seat Assignment"
              data1={flight?.seatAssignment}
              titleData2="Flight Number"
              data2={flight?.flightNumber}
            />
          </div>
        ))}

    </section>
    
  )
}

export default Flights