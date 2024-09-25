"use client"

import Input from "@components/segments/Input"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const HOTEL_DETAILS = {
  hotel: '',
  confirmationNumber: '',
  arrivalDate: '',
  departureDate: '',
  nameOnReservation: '',
  city: '',
  country: '',
}

const ProgramsAdd = () => {

  const [isSaving, setIsSaving] = useState(false)
  const [hotelDetails, setHotelDetails] = useState(HOTEL_DETAILS)
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

  
  const saveHotel = async (e) => {
    e.preventDefault() // Prevent browsers default behavior for button submit.
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/trip/hotels/add', {
        method: 'POST',
        body: JSON.stringify({
          tripId: currentTrip,
          hotel: hotelDetails.hotel,
          confirmationNumber: hotelDetails.confirmationNumber,
          arrivalDate: hotelDetails.arrivalDate,
          departureDate: hotelDetails.departureDate,
          nameOnReservation: hotelDetails.nameOnReservation,
          city: hotelDetails.city,
          country: hotelDetails.country,
        }),
      });

      if (response.ok) {
        router.push('/hotels')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="w-full">
      <h1 className="journi-page-title">Hotels</h1>
      <p>Add a new Hotel to this trip.</p>
        <form className="w-full mt-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <Input
              id='hotel'
              label='Hotel'
              type='text'
              placeholder='Hotel Name'
              onChange={(e) => setHotelDetails({...hotelDetails, hotel: e.target.value})}
              full
            />
                        <Input
              id='confirmationNumber'
              label='Confirmation'
              type='text'
              placeholder='Confirmation Number'
              onChange={(e) => setHotelDetails({...hotelDetails, confirmationNumber: e.target.value})}
              full
            />
            <Input
              id='arrivalDate'
              label='Arrival'
              type='text'
              placeholder='Arrival Date'
              onChange={(e) => setHotelDetails({...hotelDetails, arrivalDate: e.target.value})}
            />
            <Input
              id='departureDate'
              label='Departure'
              type='text'
              placeholder='Departure Date'
              onChange={(e) => setHotelDetails({...hotelDetails, departureDate: e.target.value})}
            />
            <Input
              id='nameOnReservation'
              label='Name on Reservation'
              type='text'
              placeholder='Name on the reservation'
              onChange={(e) => setHotelDetails({...hotelDetails, nameOnReservation: e.target.value})}
            />
            <Input
              id='city'
              label='City'
              type='text'
              placeholder='Hotel City'
              onChange={(e) => setHotelDetails({...hotelDetails, city: e.target.value})}
            />
            <Input
              id='country'
              label='Country'
              type='text'
              placeholder='Hotel Country'
              onChange={(e) => setHotelDetails({...hotelDetails, country: e.target.value})}
            />

          </div>
        </form>
        <div className="flex justify-end">
          <button 
            type='submit'
            className="black_btn"
            onClick={(e) => saveHotel(e)}
          >
            Save
          </button>  
        </div>
        
    </section>
  )
}

export default ProgramsAdd