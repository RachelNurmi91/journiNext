import User from "@models/user";
import { connectDatabase } from "@utils/database";

export const POST = async (req) => {
  try {
    const { userId, program, memberId } = await req.json();

    await connectDatabase();

    const newProgram = {
      program,
      memberId,
    };

    const user = await User.findById(userId);

    if (!user) {
      return new Response("Trip not found", { status: 404 });
    }

    user.programs.push(newProgram);

    await user.save();

    console.log(user);

    const savedProgram = user.programs.slice(-1);

    return new Response(JSON.stringify(savedProgram), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to add a new program", { status: 500 });
  }
};
