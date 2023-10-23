import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
	images: Array<string>
}

export default function Carousel({ images }: Props) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {

		// Implementing the setInterval method
		const interval = setInterval(() => {
			setCurrent(current + 1 == images.length ? 0 : current + 1);
		}, 10_000);

		// Clearing the interval
		return () => clearInterval(interval);
	}, [current]);


	return (
		<div id="carouselExampleIndicators" className="carousel slide">
			<div className="carousel-indicators">
				{images.map((image, index) => (
					<button type="button" key={index} data-bs-target="#carouselExampleIndicators" className={`${current == index ? 'active' : ''}`} aria-current="true" aria-label={`Slide ${index}`}></button>
				))}
			</div>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img src={images[current]}/>
				</div>
			</div>
			<button type="button" onClick={() => setCurrent(current == 0 ? images.length - 1 : current - 1)}>
			</button>
			<button type="button" onClick={() => setCurrent(current + 1 == images.length ? 0 : current + 1)}>
			</button>
		</div>
	);
}
