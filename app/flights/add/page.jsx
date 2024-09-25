"use client"

import Input from "@components/segments/Input"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Header from "@components/segments/Header"
import DatePicker from "@components/segments/DatePicker"

let round5 = 1000 * 60 * 5;
let now = new Date();
let defaultDeparture = new Date(Math.ceil(now.getTime() / round5) * round5)
let defaultReturn = new Date(Math.ceil(now.getTime() / round5) * round5)
defaultReturn.setDate(defaultReturn.getDate() + 1)

const FLIGHT_DETAILS = {
  airline: '',
  flightNumber: '',
  seatAssignment: '',
  confirmationNumber: '',
  departure: defaultDeparture,
  return: defaultReturn,
}

const FlightsAdd = () => {

  const [isSaving, setIsSaving] = useState(false)
  const [flightDetails, setFlightDetails] = useState(FLIGHT_DETAILS)
  const [currentTrip, setCurrentTrip] = useState(null)

  const router = useRouter();

  const fetchFlights = async () => {
    const res = await fetch("/api/trip")
    const data = await res.json();

    setCurrentTrip(data[0]._id)
  }

  useEffect(() => {
    fetchFlights();
  }, [])

  
  const saveFlight = async (e) => {
    e.preventDefault() // Prevent browsers default behavior for button submit.
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/trip/flights/add', {
        method: 'POST',
        body: JSON.stringify({
          tripId: currentTrip,
          airline: flightDetails.airline,
          departureDate: flightDetails.departure,
          returnDate: flightDetails.return,
          flightNumber: flightDetails.flightNumber,
          seatAssignment: flightDetails.seatAssignment,
          confirmationNumber: flightDetails.confirmationNumber
        }),
      });

      if (response.ok) {
        router.push('/flights')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const setDate = useCallback((date, label) => {
    let dateValue = label.toLowerCase()

    setFlightDetails({
      ...flightDetails, 
      [dateValue]: date
    })
    
  }, []);

  return (
    <section className="w-full">
      <Header title="Flights" subtitle="Add a new flight to this trip."/>

        <form className="w-full mt-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <DatePicker label="Departure" date={flightDetails.departure} setDate={setDate} includeTime/>
            <DatePicker label="Return" date={flightDetails.return} setDate={setDate} includeTime/>
            <Input
              id='airline'
              label='Airline'
              type='text'
              placeholder='Airline Name'
              onChange={(e) => setFlightDetails({...flightDetails, airline: e.target.value})}
              full
            />
            <Input
              id='flightNumber'
              label='Flight'
              type='text'
              placeholder='Flight Number'
              onChange={(e) => setFlightDetails({...flightDetails, flightNumber: e.target.value})}
            />
            <Input
              id='seatAssignment'
              label='Seat'
              type='text'
              placeholder='Seat Assignment'
              onChange={(e) => setFlightDetails({...flightDetails, seatAssignment: e.target.value})}
            />
            <Input
              id='confirmationNumber'
              label='Confirmation'
              type='text'
              placeholder='Confirmation Number'
              onChange={(e) => setFlightDetails({...flightDetails, confirmationNumber: e.target.value})}
              full
            />
          </div>
        </form>
        <div className="flex justify-end">
          <button 
            type='submit'
            className="black_btn"
            onClick={(e) => saveFlight(e)}
          >
            Save
          </button>  
        </div>
        
    </section>
  )
}

export default FlightsAdd