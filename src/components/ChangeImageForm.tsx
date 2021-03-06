import React from "react";
import moment from "moment";

import Form from "react-bootstrap/Form";
import ErrorFormat from "../models/ErrorFormat";

type ChangeImageFormProps = {
	updateAPODImage: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<ErrorFormat>>;
};

export default function ChangeImageForm({ updateAPODImage, setError }: ChangeImageFormProps) {
	const dateChanged = (event: any) => {
		if (new Date(event.target.value) > new Date()) {
			setError({ title: "Error", explanation: "Range error", occurred: true })
			return;
		}
		const date: string = moment(new Date(event.target.value)).format("YYYY-MM-DD");
		const current: string = moment(new Date()).format("YYYY-MM-DD");
		date !== current ?
			localStorage.setItem("apod_day", date) :
			localStorage.setItem("apod_day", "");
		updateAPODImage(prevState => !prevState);
	};

	const getDateTimeValue = (): string => {
		const storedDate: string | null = localStorage.getItem("apod_day");
		return storedDate ? storedDate : moment(new Date()).format("YYYY-MM-DD");
	};
	return (
		<Form>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Astronomy Picture of the Day</Form.Label>
				<Form.Control type="date" onChange={dateChanged} defaultValue={getDateTimeValue()} placeholder="Enter Astronomy Picture of the Day"/>
				<Form.Text className="text-muted">
					Astronomy Picture of the Day image will update
				</Form.Text>
			</Form.Group>
		</Form>
	);
}
