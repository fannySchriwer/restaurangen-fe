import React from 'react';
import './Admin.css';
import {getAllBookings} from '../../utils/api-calls';
import {IBookingItem} from '../../interfaces/IBookingItem';

const axios = require('axios');

interface IBookingState { 
  bookingInfo: IBookingItem[];
}

class Admin extends React.Component< {}, IBookingState > {

  constructor(props: any) {
    super(props);

    this.state = {
      bookingInfo: []
    }
    
  }

  componentDidMount() {
    this.getAllBookings();
  }

  getAllBookings = () => {
      getAllBookings().then((result: any) => {
        const isArr = Array.isArray(result.data);

        const storedInfo: IBookingItem[] = [];

        if (isArr) {
          this.setState({ bookingInfo: result.data });
        }
        else {         
          storedInfo.push(result.data);    
          this.setState({ bookingInfo: storedInfo });
        }
        
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  updateBookingWithID(booking: IBookingItem) {
    console.log(booking);
    axios
    .put('http://localhost/Restaurangen/admin/update-booking.php/{booking_ID}', booking)
    .then((result: any) => {
      console.log(result);
    })
  }

  deleteBookingWithID = (targetID: number) => {
     axios
     .delete('http://localhost/Restaurangen/admin/delete-booking.php/', JSON.stringify({params: {booking_ID: targetID}}))
     .then((result: any) => {
       console.log(result.data);
       //splice and reset state
     });
  }

  render() {

    return (
    <div className="App">
        <table>
        <tr>
          <th>Booking ID</th>
          <th>Customer ID</th>
          <th>Email</th> 
          <th>Guests</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Sitting</th>
        </tr>
        <tbody>
          {this.state.bookingInfo.map((booking: IBookingItem) => (
            <tr key={booking.booking_ID}>
              <td>{booking.booking_ID}</td>
              <td>{booking.customer_ID}</td>
              <td>{booking.email}</td>
              <td>{booking.guests}</td>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{booking.sitting}</td>
              <td><button onClick={this.updateBookingWithID.bind(this, booking)}>Edit</button></td>
              <td><button onClick={() => this.deleteBookingWithID(booking.booking_ID)}>Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table> 
      </div>
    );

  }

}

export default Admin;