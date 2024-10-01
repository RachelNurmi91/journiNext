"use client"

import { useEffect, useState } from "react"
import Card from "@components/segments/card"
import DataUtils from "@utils/dataUtils"
import Header from "@components/segments/Header"
import { useSession } from "next-auth/react"
import ApiUtils from "@utils/apiUtils"

const Trips = () => {
  const [tripData, setTripData] = useState([])

  const { data: session } = useSession();

  const fetchTrips = async () => {
    if (session)
      ApiUtils.fetchUser(session).then((data) => {
        const tripData = data.trips
        setTripData(tripData)
      })
  };

  useEffect(() => {
    fetchTrips();
  }, [session])

  const deleteTrip = async (trip) => {

    const tripId = trip?._id;
   
    if (!session) return

    const res = await fetch(`/api/trip/delete/${tripId}`, {
      method: 'Delete',
    })
    const data = await res.json();

    setTripData(data)
  }
  
  return (
    <section className="w-full">
      <Header 
        title="Trips" 
        showNav 
        navRight="+" 
        navRightLink="/trips/add"
      />
      {tripData && tripData.length ? (
        <>
        {tripData.map((trip) => (
          <div key={trip._id} className="mt-4" onClick={() => deleteTrip(trip)}>
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