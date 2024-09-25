import Flight from "@models/trip";
import { connectDatabase } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, trip, startDate, endDate, selections } = await req.json();

  try {
    await connectDatabase();

    const newTrip = new Flight({
      creator: userId,
      trip: trip,
      endDate: endDate,
      startDate: startDate,
      selections: {
        flights: selections.flights,
        hotels: selections.hotels,
        cruise: selections.cruise,
        rentalCar: selections.rentalCar,
        transportation: selections.transportation,
        insurance: selections.insurance,
      },
    });

    await newTrip.save();
    return new Response(JSON.stringify(newTrip), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new flight", { status: 500 });
  }
};
