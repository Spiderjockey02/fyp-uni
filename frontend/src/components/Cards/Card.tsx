import styles from '@/styles/Card.module.css';
import { ReactElement } from 'react';

interface Props {
  children: ReactElement
}

export default function Card({ children }: Props) {
	return (
		<div className={styles.card}>
			{children}
		</div>
	);
}

export function Body({ children }: Props) {
	return (
		<div className={styles['card-body']}>
			{children}
		</div>
	);
}


interface TitleProp {
	text: string
}

export function Title({ text }: TitleProp) {
	return (
		<h5 className={styles['card-title']}>
			{text}
		</h5>
	);
}