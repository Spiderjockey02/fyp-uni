import styles from '@/styles/Card.module.css';
import type { CSSProperties, ReactElement } from 'react';

interface Props {
  children: ReactElement | Array<ReactElement>
	style?: CSSProperties
}

function Card({ style, children }: Props) {
	return (
		<div className={styles.card} style={style}>
			{children}
		</div>
	);
}

function Body({ children }: Props) {
	return (
		<div className={styles['card-body']}>
			{children}
		</div>
	);
}

interface TitleProp {
	text: string
}

function Title({ text }: TitleProp) {
	return (
		<h5 className={`${styles['card-title']} horizontal-center`}>
			{text}
		</h5>
	);
}

Card.Body = Body;
Card.Title = Title;
export default Card;