import Program from "@models/program";
import { connectDatabase } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, program, memberId } = await req.json();

  try {
    await connectDatabase();

    const newProgram = new Program({
      creator: userId,
      program,
      memberId,
    });

    await newProgram.save();

    return new Response(JSON.stringify(newProgram), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new program", { status: 500 });
  }
};
