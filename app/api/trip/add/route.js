import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const POST = async (req, res) => {
  const { email, trip, startDate, endDate, selections } = await req.json();

  try {
    await connectDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const newTrip = {
      trip: trip,
      startDate: startDate,
      endDate: endDate,
      flights: selections.flights,
      hotels: selections.hotels,
      cruise: selections.cruise,
      rentalCar: selections.rentalCar,
      transportation: selections.transportation,
      insurance: selections.insurance,
    };

    user.trips.push(newTrip);

    await user.save();

    return new Response(JSON.stringify(newTrip), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new trip", { status: 500 });
  }
};
