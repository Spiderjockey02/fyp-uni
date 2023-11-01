import styles from '@/styles/Button.module.css';
import { CSSProperties } from 'react';

interface Props {
  children: string
  onClick?: () => void
  style?: CSSProperties
}

export default function SuccessButton({ children, onClick, style }: Props) {
	return (
		<button className={`${styles.button} ${styles.success}`} style={style} onClick={onClick}>
			{children}
		</button>
	);
}