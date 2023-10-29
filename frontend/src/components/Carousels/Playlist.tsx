import { useState, useRef, useEffect, ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Carousel.module.css';
interface Props {
	children: Array<ReactElement>
}

export default function PlaylistCarousel({ children }: Props) {
	const [current, setCurrent] = useState(0);
	const [perPageView, setPerPageView] = useState(5);
	const [displayedElements, setDisplayedElements] = useState<Array<ReactElement>>(children.slice(current * perPageView, current + perPageView));
	const elements = useRef<Array<HTMLDivElement | null>>([]);

	useEffect(() => {
		const index = elements.current.findIndex((e) => (e?.getBoundingClientRect().y ?? 0) > (elements.current.at(0)?.getBoundingClientRect().y ?? 0));
		setPerPageView(index == -1 ? 5 : index);
	}, []);

	// Check overflow stuff
	function prevPage() {
		setCurrent(current == 0 ? (Math.ceil(children.length / perPageView) - 1) : current - 1);
		setDisplayedElements(children.filter(c => Number(c.key) >= (current * perPageView) + 1 && Number(c.key) <= (current * perPageView) + 5));
	}

	// Check overflow stuff
	function nextPage() {
		setCurrent(current + 1 == Math.ceil(children.length / perPageView) ? 0 : current + 1);
		setDisplayedElements(children.filter(c => Number(c.key) >= (current * perPageView) + 1 && Number(c.key) <= (current * perPageView) + 5));
	}

	return (
		<div className={styles.carousel} style={{ paddingBottom: '30px' }}>
			<div className={styles['carousel-inner']}>
				<div className="list-container">
					{displayedElements.map((element, index) => (
						<div key={index} ref={(ref) => elements.current[index] = ref}>
							{element}
						</div>
					))}
				</div>
			</div>
			<button className={styles['carousel-control-prev']} role="button" data-slide="prev" onClick={() => prevPage()}>
				<span className={styles['carousel-control-prev-icon']} aria-hidden="true">
					<FontAwesomeIcon icon={faChevronLeft}/>
				</span>
			</button>
			<button className={styles['carousel-control-next']} role="button" data-slide="next" onClick={() => nextPage()}>
				<span className={styles['carousel-control-next-icon']} aria-hidden="true">
					<FontAwesomeIcon icon={faChevronRight}/>
				</span>
			</button>
		</div>
	);
}
