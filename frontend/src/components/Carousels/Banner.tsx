import { useState, useEffect } from 'react';
import styles from '@/styles/Carousel.module.css';

interface Props {
	images: Array<string>
}

export default function BannerCarousel({ images }: Props) {
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
		<div id="carouselExampleIndicators" className={styles.carousel}>
			<div className={styles['carousel-indicators']}>
				{images.map((image, index) => (
					<button type="button" key={index} data-bs-target="#carouselExampleIndicators" className={`${current == index ? styles.active : ''}`} aria-current="true" aria-label={`Slide ${index}`} onClick={() => setCurrent(index)}></button>
				))}
			</div>
			<div className={styles['carousel-inner']}>
				{images.map((image, index) => (
					<div className={`${styles['carousel-item']} ${styles.fade} ${index == current ? styles.active : ''}`} key={image}>
						<img src={image} />
					</div>
				))}
			</div>
		</div>
	);
}
