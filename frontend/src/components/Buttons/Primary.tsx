import styles from '@/styles/Button.module.css';
import { CSSProperties } from 'react';

interface Props {
  children: string
  onClick?: () => void
  style?: CSSProperties
}

export default function PrimaryButton({ children, onClick, style }: Props) {
	return (
		<button className={`${styles.button} ${styles.primary}`} style={style} onClick={onClick}>
			{children}
		</button>
	);
}