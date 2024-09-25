"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Card from "@components/segments/card"
import DataUtils from "@utils/dataUtils"
import Header from "@components/segments/Header"

const Programs = () => {
  const [programs, setPrograms] = useState([])

  const fetchPrograms = async () => {
    const res = await fetch("/api/trip")
    const data = await res.json();
    console.log(data)

    setPrograms(data[0].programs)
  }

  useEffect(() => {
    fetchPrograms();
  }, [])
  
  return (
    <section className="w-full">
      <Header 
        title="Reward Programs" 
        showNav 
        navRight="+" 
        navRightLink="programs/add"
      />
      {programs ? (
        <>        
          {programs?.map((hotel) => (
              <div key={hotel._id} className="mt-4">
                {/* <Card 
                  title={hotel?.hotel}
                  confirmationNumber={hotel?.confirmationNumber}
                  location={`${hotel?.city}, ${hotel?.country}`}
                  titleData1="Arrival Date"
                  data1={DataUtils.formatLongDate(hotel?.arrivalDate)}
                  titleData2="Departure Date"
                  data2={DataUtils.formatLongDate(hotel?.departureDate)}
                  titleData3="Name on Reservation"
                  data3={hotel?.nameOnReservation}
                /> */}
              </div>
            ))
          }
        </>
      ) : (<>No reward programs.</>)}


    </section>
    
  )
}

export default Programs