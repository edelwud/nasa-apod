import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import {getRecentAPODImage, loadImage} from "../services/nasaService";
import ImageFormat from "../models/ImageFormat";
import ErrorFormat from "../models/ErrorFormat";
import AlertDismissible from "../components/AlertDismissable";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

type PicturesListProps = {
	images: ImageFormat[];
}

function PicturesList({ images }: PicturesListProps) {
	const imagesList = images.map((image: ImageFormat) => {
		return (
			<Col sm={4}>
				<Card className="mb-3">
					{ image.media_type === "image" ?
						<Card.Img variant="top" className="pictures__image" src={image.url} /> :
						<iframe
							title={image.title}
							width="560"
							height="315"
							src={image.url}
							frameBorder="0"
							className="pictures__image"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					}
					<Card.Body>
						<Card.Title>{image.title}</Card.Title>
						<Card.Text className="pictures__text">{image.explanation}</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		);
	});
	return (
		<Row className="pt-5">
			{ imagesList }
		</Row>
	)
}

export default function PicturesPage() {
	const [pictures, setPictures] = useState<ImageFormat[]>([]);
	const [error, setError] = useState<ErrorFormat>({ explanation: "", occurred: false, title: "" });

	useEffect(() => {
		const dates = new Array(6)
			.fill(new Date())
			.map((date: Date, index) => new Date(moment(date).subtract(index + 1, "day").format("YYYY-MM-DD")))
		const loadPictures = (): Promise<ImageFormat[]> => {
			const imagesList: Promise<ImageFormat>[] = [];
			for (const date of dates) {
				imagesList.push(getRecentAPODImage(date, false));
			}
			return Promise.all(imagesList);
		}
		loadPictures().then((result: ImageFormat[]) => setPictures(result)).catch(() => {
			setError({ title: "Error", explanation: "Error during rendering", occurred: true });
		});
	}, []);

	return (
		<Container className="pt-5">
			<h1 className="pictures__topic">Astronomy Picture of the Day pictures</h1>
			<AlertDismissible error={error} setError={setError} />
			<PicturesList images={pictures} />
			<Link to="/"><Button className="pictures__back-button mb-5">Back</Button></Link>
		</Container>
	);
}
