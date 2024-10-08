import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const POST = async (req, res) => {
  try {
    const {
      tripId,
      airline,
      flightNumber,
      seatAssignment,
      confirmationNumber,
    } = await req.json();

    await connectDatabase();

    const newFlight = {
      airline,
      flightNumber,
      seatAssignment,
      confirmationNumber,
    };

    const trip = await User.findById(tripId);

    if (!trip) {
      return new Response("Trip not found", { status: 404 });
    }

    trip.flights.push(newFlight);

    await trip.save();

    const savedFlight = trip.flights.slice(-1);

    return new Response(JSON.stringify(savedFlight), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to add a new flight", { status: 500 });
  }
};
