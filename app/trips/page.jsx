"use client"

import { useEffect, useState } from "react"
import Card from "@components/segments/card"
import DataUtils from "@utils/dataUtils"
import Header from "@components/segments/Header"
import { useSession } from "next-auth/react"
import ApiUtils from "@utils/apiUtils"

const Trips = () => {
  const [tripData, setTripData] = useState([])
  const [userData, setUserData] = useState(null)

  const fetchUserData = async () => {
    let user = JSON.parse(localStorage.getItem('journiUser'));
    let userResponse = await ApiUtils.fetchUser(user.userId);
    setTripData(userResponse.trips);
  }

  useEffect(() => {
    fetchUserData();
  }, [])
  

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