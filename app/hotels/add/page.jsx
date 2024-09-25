"use client"

import Input from "@components/segments/Input"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Header from "@components/segments/Header"
import DatePicker from "@components/segments/DatePicker"

let defaultArrival = new Date()
let defaultDeparture = new Date()
defaultDeparture.setDate(defaultDeparture.getDate() + 1)

const HOTEL_DETAILS = {
  hotel: '',
  confirmationNumber: '',
  arrivalDate: defaultArrival,
  departureDate: defaultDeparture,
  nameOnReservation: '',
  city: '',
  country: '',
}

const HotelAdd = () => {

  const [isSaving, setIsSaving] = useState(false)
  const [hotelDetails, setHotelDetails] = useState(HOTEL_DETAILS)
  const [currentTrip, setCurrentTrip] = useState(null)

  const router = useRouter();

  const fetchHotels = async () => {
    const res = await fetch("/api/trip")
    const data = await res.json();

    setCurrentTrip(data[0]._id)
  }

  useEffect(() => {
    fetchHotels();
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

  const setDate = useCallback((date, label) => {
    let dateValue = label.toLowerCase()

    setHotelDetails({
      ...hotelDetails, 
      [dateValue]: date
    })
    
  }, []);


  return (
    <section className="w-full">
      <Header 
        title="Hotels" 
        subtitle="Add a new hotel to this trip." 
        showNav 
        navLeft="<" 
        navLeftLink="/hotels"
      />
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
            <DatePicker label="Arrival" date={hotelDetails.arrivalDate} setDate={setDate}/>
            <DatePicker label="Departure" date={hotelDetails.departureDate} setDate={setDate}/>
            <Input
              id='nameOnReservation'
              label='Name on Reservation'
              type='text'
              placeholder='Name on the reservation'
              full
              onChange={(e) => setHotelDetails({...hotelDetails, nameOnReservation: e.target.value})}
            />
            {/* <Input
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
            /> */}

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

export default HotelAdd