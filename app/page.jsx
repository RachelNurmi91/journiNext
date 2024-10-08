"use client"

import { useEffect, useState } from "react"
import DataUtils from "@utils/dataUtils"
import Link from "next/link"
import ApiUtils from "@utils/apiUtils"

const Home = () => {
  const [userData, setUserData] = useState(null)
  const [trips, setTrips] = useState(null)

  const fetchUserData = async () => {
    let user = JSON.parse(localStorage.getItem('journiUser'));
    let userResponse = await ApiUtils.fetchUser(user.userId);
    setUserData(userResponse);
  }

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('journiUser'));
    if (user) {
      fetchUserData(user)
    }
  }, [])
  

  return (
    <section className="w-full flex-center flex-col text-center">
        { userData 
          ? 
          (
            <div>
              <h1>Welcome Back, {userData.name}!</h1>
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
                </>)
              }
            </div>
          )
          : 
          (<div><Link href="/login" className="text-blue-500">Login</Link> or <Link href="/register" className="text-blue-500">Register</Link> to add a trip</div>) }
      </section>
  )
}

export default Home