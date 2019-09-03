import * as React from "react"; 
import BookingCalendar from '../BookingCalendar/BookingCalendar';
import AvailableTables from '../AvailableTables/AvailableTables';
import {fetchConfig} from '../../utils/api-calls';

export interface IBookingProps { 
}

export interface IBookingState { 
	date: string;
	config: {
		tables: string;
		sittingOne: string;
		sittingTwo: string;
		GDPRMessage: string;
	}
	
	formControls: {
		name: string;
		email: string;
		phone: string;
	}
}

class Booking extends React.Component<IBookingProps, IBookingState> { 
	constructor(props: IBookingProps) {
		super(props);
		this.state = { 
			date: "",
			config: {
				tables: "",
				sittingOne: "",
				sittingTwo: "",
				GDPRMessage: "",
			},
			formControls: {
				name: "",
				email: "",
				phone: "",
			}
		};
	}

	componentDidMount() {
		fetchConfig()
			.then((result: any) => {
				const data = result.data;

				let configObj = data.reduce((acc: any, obj: any) => {
					return { ...acc, [obj.key]: obj["value"]}
				}, {});

				this.setState(prevState => {
					let config = Object.assign({}, prevState.config);
					config.tables = configObj.tables;
					config.sittingOne = configObj.sitting_one;
					config.sittingTwo = configObj.sitting_two;
					config.GDPRMessage = configObj.GDPR;
					return { config };
				})
			})
			.catch(error => {
				console.log(error);
			})
	}

	changeDate = (date: string) => {		
		this.setState({ date: date });
	}

	render() {
    return (
      <div className="Booking">
          <h1>Booking works</h1>
					<p>{this.state.config.sittingTwo}</p>
					<BookingCalendar handleDate={this.changeDate}/>
					<AvailableTables date={this.state.date}/>
      </div>
    );
	}
}

export default Booking;