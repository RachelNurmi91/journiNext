"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Card from "@components/segments/card"
import Header from "@components/segments/Header"

const Flights = () => {
  const [flights, setFlights] = useState([])

  const { data: session } = useSession();

  const fetchFlights = async () => {
    if (!session) return

    const res = await fetch("/api/trip")
    let data = await res.json();

    setFlights(data?.[0]?.flights)
  }

  useEffect(() => {
    fetchFlights();
  }, [session])
  
  return (
    <section className="w-full">
      <Header 
        title="Flights" 
        showNav 
        navRight="+" 
        navRightLink="/flights/add"
      />
      {flights && flights.length ? (
        <>
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
        </>
      ):
      (
        <div>You have no flights.</div>
      )}
    </section>
    
  )
}

export default Flights