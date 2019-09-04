import React, { Component } from "react";

import { fetchConfig, createBooking } from "../../utils/api-calls";

import { IBooking } from "../../interfaces/IBooking";

import { DetailsForm } from "../DetailsForm/DetailsForm";
import { GDPR } from "../GDPR/GDPR";

interface IBookingState {
	GDPRMessage: string;
	userName: string;
}

class Booking extends Component<{}, IBookingState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			GDPRMessage: "",

			userName: ""
		}
	}

	componentDidMount() {
		fetchConfig()
			.then((result: any) => {
				const data = result.data;

				let configObj = data.reduce((acc: any, obj: any) => {
					return { ...acc, [obj.key]: obj["value"] }
				}, {});

				// TODO: remove
				console.log(configObj.GDPR);

				this.setState({
					GDPRMessage: configObj.GDPR
				})

			})
			.catch(error => {
				console.log(error);
			})
	}

	// TODO: Add to separate function together with prepareBooking
	bookingObj = (): IBooking => {
		return {
			name: "Johan",
			email: "johan@gmail.com",
			phone: "0123456789",
			guests: "7",
			sitting: "2013-08-30 19:05:00"
		};
	}

	prepareBooking = (): void => {
		const obj = this.bookingObj();

		createBooking(obj)
			.then((result: any) => {
				console.log(result.data);
			})
			.catch(error => {
				console.log(error);
			})
	}

	changeHandler = (newUserName: string) => {
		this.setState({ userName: newUserName });

		console.log(this.state.userName);
	}

	public render() {
		const { GDPRMessage } = this.state;

		return (
			<>
				<button onClick={this.prepareBooking}>Send</button>

				<DetailsForm changeHandler={this.changeHandler} />

				<GDPR msg={GDPRMessage} />
			</>
		);
	}
}

export default Booking;