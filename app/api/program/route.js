import Program from "@models/trip";
import { connectDatabase } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectDatabase();

    const programs = await Program.find({}).populate("creator");
    console.log("route.js ", programs);

    return new Response(JSON.stringify(programs), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch programs", { status: 500 });
  }
};
