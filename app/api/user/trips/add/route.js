import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const POST = async (req) => {
  console.log("TEST POST TEST POST TEST POST TEST POST");
  const { email, trip, startDate, endDate, selections } = await req.json();

  try {
    await connectDatabase();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    console.log("User found: ", user);

    // Create the new trip object
    const newTrip = {
      trip,
      startDate: new Date(startDate), // Ensure it's a Date object
      endDate: new Date(endDate), // Ensure it's a Date object
      flights: Array.isArray(selections.flights) ? selections.flights : [], // Ensure it's an array
      hotels: Array.isArray(selections.hotels) ? selections.hotels : [], // Ensure it's an array
      cruise: selections.cruise || null,
      rentalCar: selections.rentalCar || null,
      transportation: selections.transportation || null,
      insurance: selections.insurance || null,
    };

    // Add the new trip to the user's trips array
    user.trips.push(newTrip);

    // Save the updated user document
    await user.save();

    return new Response(JSON.stringify(newTrip), { status: 200 });
  } catch (error) {
    console.log("SAVE ERROR: ", error);
    return new Response("Failed to create a new trip", { status: 500 });
  }
};
