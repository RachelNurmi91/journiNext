import Trip from "@models/trip";
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

    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found." });
    }

    trip.hotels.push(newHotel);

    await trip.save();

    const savedHotel = trip.flights.slice(-1);

    return res.status(200).json({
      message: "Success: Hotel saved successfully",
      newFlight: savedHotel,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create a new hotel" });
  }
};
