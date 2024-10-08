import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const POST = async (req, res) => {
  try {
    const {
      tripId,
      hotel,
      confirmationNumber,
      arrivalDate,
      departureDate,
      nameOnReservation,
      city,
      country,
    } = await req.json();

    await connectDatabase();

    const newHotel = {
      hotel,
      confirmationNumber,
      arrivalDate,
      departureDate,
      nameOnReservation,
      city,
      country,
    };

    const trip = await User.findById(tripId);

    if (!trip) {
      return new Response("Trip not found", { status: 404 });
    }

    trip.hotels.push(newHotel);

    await trip.save();

    const savedHotel = trip.flights.slice(-1);

    return new Response(JSON.stringify(savedHotel), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to add a new hotel", { status: 500 });
  }
};
