import axios from "axios";
import { IBooking } from "../interfaces/IBooking";

export function createBooking(booking: IBooking) {
  return axios.post("http://localhost/bookings/create-booking.php", JSON.stringify(booking));
}

export function fetchGDPR() {
  return axios.get("http://localhost/bookings/get-configuration.php");
}

export function getAllBookings() {
  return axios.get('http://localhost/Restaurangen/admin/get-bookings.php');
}