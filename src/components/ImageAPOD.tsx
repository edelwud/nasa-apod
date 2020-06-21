import Figure from "react-bootstrap/Figure";
import React from "react";

import ImageFormat from "../models/ImageFormat";

type ImageAPODProps = {
	image: ImageFormat;
}

export default function ImageAPOD({ image }: ImageAPODProps) {
	function RenderFragment() {
		return image.media_type === "video" ?
			<iframe
				title={image.title}
				width="560"
				height="315"
				src={image.url}
				frameBorder="0"
				className="figure__apod_image"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/> :
			<Figure.Image className="figure__apod_image" src={image.url} fluid />;
	}

	return (
		<Figure>
			<RenderFragment />
			<Figure.Caption>
				<h1>{ image.title }</h1>
				<p>{ image.explanation }</p>
			</Figure.Caption>
		</Figure>
	);
}
