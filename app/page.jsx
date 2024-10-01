"use client"

import TripAdd from "./trips/add/page"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import DataUtils from "@utils/dataUtils"
import Link from "next/link"

const Home = () => {
  const [trips, setTrips] = useState(null)

  const { data: session, status } = useSession();

  const fetchTrips = async () => {
    const res = await fetch("/api/trip")
    const data = await res.json();

    setTrips(data)
  }

  useEffect(() => {
    fetchTrips();
  }, [])
  

  return (
    <section className="w-full flex-center flex-col text-center">
      { session 
        ? 
        (
          <div>
            <h1>Welcome Back!</h1>
            {
              trips && trips.length ? (
                <div>
                  <p>Your next trip is to {trips[0].trip}</p>
                  <p>Get ready to leave on {DataUtils.formatLongDate(trips[0].startDate)}</p>
                </div>
              ) :
              (
              <>
                <p>
                  Are you ready for your first trip?
                </p>
                <TripAdd />
              </>)
            }
          </div>
        )
        : 
        (<div>Sign in or <Link href="/register">Register</Link> to add a trip</div>) }
    </section>
  )
}

export default Home