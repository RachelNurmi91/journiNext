import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectDatabase();

    const trips = await User.find({}).populate("creator");

    return new Response(JSON.stringify(trips), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch trips", { status: 500 });
  }
};
