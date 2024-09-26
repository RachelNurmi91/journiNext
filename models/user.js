import { Schema, model, models } from "mongoose";

const ProgramSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  program: {
    type: String,
    required: [true, "Program name is required."],
  },
  memberId: {
    type: String,
    required: [true, "Program Member Id is required."],
  },
});

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists."],
    required: [true, "Email is required."],
  },
  username: {
    type: String,
    required: [true, "Username is required."],
    match: [
      /^(?=.{8,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-30 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
  programs: [ProgramSchema],
});

const User = models.User || model("User", UserSchema);

export default User;
