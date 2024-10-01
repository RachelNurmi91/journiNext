import User from "@models/user";
import { connectDatabase } from "@utils/database";

const generateUniqueId = () => {
  let id = "";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  for (let i = 0; i < 2; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < 4; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return id;
};

const createUserId = async () => {
  const id = generateUniqueId();

  // Check to see if the id combination already exists in the database.
  // If it does exist, call the function again.
  const existingUserId = await User.findOne({ userId: id });

  if (existingUserId) {
    createUserId();
  }

  return id;
};

export const POST = async (req) => {
  const { name, email, password } = await req.json();

  try {
    await connectDatabase();

    // Generate a unique user ID
    const id = await createUserId();

    // Check to see if the email already exists in the database
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return new Response("Email already exists", { status: 409 });
    }

    const newUser = new User({
      userId: id,
      name: name,
      email: email,
      password: password,
    });

    // Save the new user to the database
    await newUser.save();

    console.log("Registration was successful!");
    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    console.log("Failed to register a new user: ", error);

    return new Response("Failed to register a new user", { status: 500 });
  }
};
