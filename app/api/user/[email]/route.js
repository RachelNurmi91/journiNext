// app/api/user/[email]/route.js
import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const GET = async (req, { params }) => {
  // Make sure to destructure params from the second argument
  console.log("Received params:", params); // Log params to see what's received

  // Check if params is defined and contains email
  if (!params || !params.email) {
    return new Response("Parameters are missing", { status: 400 });
  }

  const { email } = params; // Extract email from params
  console.log("email", email); // Log email to debug

  try {
    await connectDatabase();

    // Find user by email
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
