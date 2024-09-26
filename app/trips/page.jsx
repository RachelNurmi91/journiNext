"use client"

import { useEffect, useState } from "react"
import Card from "@components/segments/card"
import DataUtils from "@utils/dataUtils"
import Header from "@components/segments/Header"
import { useSession } from "next-auth/react"

const Trips = () => {
  const [trips, setTrips] = useState([])

  const { data: session } = useSession();

  const fetchHotels = async () => {
    if (!session) return

    const res = await fetch("/api/trip")
    const data = await res.json();

    setTrips(data)
  }

  useEffect(() => {
    fetchHotels();
  }, [])
  
  return (
    <section className="w-full">
      <Header 
        title="Trips" 
        showNav 
        navRight="+" 
        navRightLink="/trips/add"
      />
      {trips && trips.length ? (
        <>
        {trips.map((trip) => (
          <div key={trip._id} className="mt-4">
            <Card 
              title={trip.trip}
              titleData1="Start Date"
              data1={DataUtils.formatLongDate(trip?.startDate)}
              titleData2="End Date"
              data2={DataUtils.formatLongDate(trip?.endDate)}
              titleData3="Name on Reservation"
              data3={trip?.nameOnReservation}
            />
          </div>
        ))}
        </>
      ) : (
        <div>You have no trips.</div>
      )}
    </section>
  )
}

export default Trips