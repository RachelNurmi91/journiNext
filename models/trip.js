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
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  trip: {
    type: String,
    required: [true, "Name is required."],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required."],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required."],
  },
  flights: [FlightSchema],
  hotels: [HotelSchema],
});

// const Flight = models.Flight || model("Flight", FlightSchema);
const Trip = models.Trip || model("Trip", TripSchema);
// const Hotel = models.Hotel || model("Hotel", HotelSchema);

export default Trip;
