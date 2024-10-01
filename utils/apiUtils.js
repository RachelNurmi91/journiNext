export default class ApiUtils {
  static fetchUser = async (session) => {
    const email = session?.user?.email;
    const response = await fetch(`/api/user/${encodeURIComponent(email)}`);
    const data = await response.json();

    return data;
  };

  static fetchFlights = async () => {
    const fetchResponse = await fetch("/api/trip");
    const data = await fetchResponse.json();

    return data;
  };

  static saveFlight = async (currentTrip, flightDetails) => {
    const saveResponse = await fetch("/api/trip/flights/add", {
      method: "POST",
      body: JSON.stringify({
        tripId: currentTrip,
        airline: flightDetails.airline,
        departureDate: flightDetails.departure,
        returnDate: flightDetails.return,
        flightNumber: flightDetails.flightNumber,
        seatAssignment: flightDetails.seatAssignment,
        confirmationNumber: flightDetails.confirmationNumber,
      }),
    });

    return saveResponse;
  };
}
