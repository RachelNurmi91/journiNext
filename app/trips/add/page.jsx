"use client"

import Input from "@components/segments/Input"
import Checkbox from "@components/segments/Checkbox"
import { useState, useCallback, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@components/segments/Header"
import ApiUtils from "@utils/apiUtils"

let defaultStart = new Date()
let defaultEnd = new Date()
defaultEnd.setDate(defaultEnd.getDate() + 1)


const TRIP_DETAILS = {
  trip: '',
  start: defaultStart,
  end: defaultEnd,
  selections: {
    flights: false,
    hotels: false,
  }
}

const TripAdd = () => {

  const [isSaving, setIsSaving] = useState(false)
  const [tripDetails, setTripDetails] = useState(TRIP_DETAILS)
  const [trips, setTrips] = useState([])

  const { data: session } = useSession();
  const router = useRouter();

  const fetchTrips = async () => {
    if (session)
      ApiUtils.fetchUser(session).then((data) => {
        const tripData = data.trips
        setTrips(tripData)
      })
  };

  console.log(trips)

  useEffect(() => {
    fetchTrips();
  }, [session])



  
  const saveTrip = async (e) => {
    e.preventDefault() // Prevent browsers default behavior for button submit.
    setIsSaving(true)

    try {
      const response = await fetch('/api/user/trips/add', {
        method: 'POST',
        body: JSON.stringify({
          email: session.user.email,
          trip: tripDetails.trip,
          tripId: generateTripId(),
          startDate: tripDetails.start,
          endDate: tripDetails.end,
          selections: {
            flights: tripDetails.selections.flights,
            hotels: tripDetails.selections.hotels,
          },
        }),
      });

      if (response.status === 200) {
        // router.push('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const setDate = useCallback((date, label) => {
    let dateValue = label.toLowerCase()

    setTripDetails({
      ...tripDetails, 
      [dateValue]: date
    })
    
  }, []);
  


  return (
    <section className="w-full">
      <Header 
        title="Trips" 
        subtitle="Add a new trip." 
        showNav 
        navLeft="<" 
        navLeftLink="/trips"
      />
        <form className="w-full mt-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <Input
              id='trip'
              label='Trip'
              type='text'
              placeholder='Give your trip a unique name'
              onChange={(e) => setTripDetails({...tripDetails, trip: e.target.value})}
              full
            />
            <Checkbox 
              id='flights'
              label='Flights'
              onChange={(e) => setTripDetails({
                ...tripDetails,
                selections: {
                  ...tripDetails.selections, 
                  flights: e.target.checked
                }
              })}
            />
             <Checkbox 
              id='hotels'
              label='Hotels'
              onChange={(e) => setTripDetails({
                ...tripDetails,
                selections: {
                  ...tripDetails.selections, 
                  hotels: e.target.checked
                }
              })}
            />
          </div>
        </form>
        <div className="flex justify-end">
          <button 
            type='submit'
            className="black_btn"
            onClick={(e) => saveTrip(e)}
          >
            Save
          </button>  
        </div>
        
    </section>
  )
}

export default TripAdd