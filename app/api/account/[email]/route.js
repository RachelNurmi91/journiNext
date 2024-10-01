// app/api/user/[email]/route.js
import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const GET = async (req, { params }) => {
  console.log(params);
  const { email } = params;

  try {
    await connectDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch user", { status: 500 });
  }
};
