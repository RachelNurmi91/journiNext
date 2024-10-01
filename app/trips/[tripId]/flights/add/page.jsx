"use client"

import Input from "@components/segments/Input"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Header from "@components/segments/Header"
import CategoryLayout from "@components/CategoryLayout"
import ApiUtils from "@utils/apiUtils"

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

 useEffect(() => {
    const fetchData = async () => {
      try {
        let flightData = await ApiUtils.fetchFlights();
        setFlightDetails(flightData);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);
  
  const saveFlight = async (e) => {
    debugger;
    e.preventDefault() // Prevent browsers default behavior for button submit.
    setIsSaving(true)
    
    try {
      const response = await ApiUtils.saveFlight(currentTrip, flightDetails)
      console.log('response: ', response)
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

  const navigation = {
    showNav: true,
    navLeft: "<",
    navLeftLink: "/flights"
  }

  const renderFlightForm = () => {
    return (
      <>
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
      </>
    )
  }



  return (
    <section className="w-full">
      <CategoryLayout 
        title="Flights" 
        subtitle="Add a new flight to this trip."
        navigation={navigation}
        renderForm={renderFlightForm}
        formBtnTitle="Save"
        formBtnOnClick={saveFlight}
      />
    </section>
  )
}

export default FlightsAdd