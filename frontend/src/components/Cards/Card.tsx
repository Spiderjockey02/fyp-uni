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


export function Title({ children }: Props) {
	return (
		<h5 className={styles['card-title']}>
			{children}
		</h5>
	);
}