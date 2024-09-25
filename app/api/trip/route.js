import Trip from "@models/trip";
import { connectDatabase } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectDatabase();

    const trips = await Trip.find({}).populate("creator");

    return new Response(JSON.stringify(trips), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch trips", { status: 500 });
  }
};
