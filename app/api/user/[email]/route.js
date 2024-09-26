import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const GET = async (req, { params }) => {
  const { email } = params;

  try {
    await connectDatabase();

    const user = await User.findOne({ email });
    console.log(user);

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch user", { status: 500 });
  }
};
