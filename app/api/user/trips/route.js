import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectDatabase();

    // Find all users and return only the 'trips' field
    const trips = await User.find({}, "trips"); // Returns only the 'trips' array from all users

    return new Response(JSON.stringify(trips), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch trips", { status: 500 });
  }
};
