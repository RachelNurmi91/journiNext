import Trip from "@models/trip";
import { connectDatabase } from "@utils/database";

export const DELETE = async (req, { params }) => {
  const { tripId } = params;

  try {
    await connectDatabase();

    // Attempt to delete the trip with the specified tripId
    const deletedTrip = await Trip.findByIdAndDelete(tripId);

    if (deletedTrip.deletedCount === 0) {
      return new Response("No trip found with the specified tripId", {
        status: 404,
      });
    }

    const updatedTrips = await Trip.find({}).populate("creator");

    return new Response(JSON.stringify(updatedTrips), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete trip", { status: 500 });
  }
};
