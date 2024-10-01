import { Schema, model, models } from "mongoose";

// const FlightDetailsSchema = new Schema({
//   airline: {
//     type: String,
//     required: [true, "Airline is required."],
//   },
//   confirmationNumber: {
//     type: String,
//   },
//   flightNumber: {
//     type: String,
//   },
//   seatAssignment: {
//     type: String,
//   },
// });

const FlightSchema = new Schema({
  // departureFlight: {
  //   type: FlightDetailsSchema,
  //   required: [true, "Departure flight is required."],
  // },
  airline: {
    type: String,
    required: [true, "Airline is required."],
  },
  confirmationNumber: {
    type: String,
  },
  flightNumber: {
    type: String,
  },
  seatAssignment: {
    type: String,
  },
});

const HotelSchema = new Schema({
  hotel: {
    type: String,
    required: [true, "Hotel name is required."],
  },
  arrivalDate: {
    type: Date,
    required: [true, "Arrival date is required."],
  },
  departureDate: {
    type: Date,
    required: [true, "Departure date is required."],
  },
  nameOnReservation: {
    type: String,
    required: [true, "Name on reservation is required."],
  },
  confirmationNumber: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const TripSchema = new Schema({
  trip: {
    type: String,
    required: [true, "Name is required."],
  },
  startDate: {
    type: String,
    required: [true, "Start date is required."],
  },
  endDate: {
    type: String,
    required: [true, "End date is required."],
  },
  flights: [FlightSchema],
  hotels: [HotelSchema],
});

const ProgramSchema = new Schema({
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
  userId: {
    type: String,
    required: [true, "User ID generation error."],
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    unique: [true, "Email already exists."],
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  image: {
    type: String,
  },
  programs: [ProgramSchema],
  trips: [TripSchema],
});

const User = models.User || model("User", UserSchema);

export default User;
