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

const Program = models.Program || model("Program", ProgramSchema);

export default Program;
