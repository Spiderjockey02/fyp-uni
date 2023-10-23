import { useState, ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
interface Props {
	children: Array<ReactElement>
}

export default function PlaylistCarousel({ children }: Props) {
	const [current, setCurrent] = useState(0);
	const displayedElements = children.slice(current, current + 5);

	return (
		<div className="carousel slide" style={{ paddingBottom: '30px' }}>
			<div className="carousel-inner">
				<div className="list-container">
					{displayedElements.map((element, index) => (
						<div key={index}>
							{element}
						</div>
					))}
				</div>
			</div>
			<button className="carousel-control-prev" role="button" data-slide="prev" onClick={() => setCurrent(current == 0 ? Math.floor(children.length / 5) : current - 1)}>
				<span className="carousel-control-prev-icon" aria-hidden="true">
					<FontAwesomeIcon icon={faChevronLeft}/>
				</span>
			</button>
			<button className="carousel-control-next" role="button" data-slide="next" onClick={() => setCurrent(current + 1 == Math.floor(children.length / 5) ? 0 : current - 1)}>
				<span className="carousel-control-next-icon" aria-hidden="true">
					<FontAwesomeIcon icon={faChevronRight}/>
				</span>
			</button>
		</div>
	);
}
