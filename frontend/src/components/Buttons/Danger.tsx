import styles from '@/styles/Button.module.css';
import type { CSSProperties } from 'react';

interface Props {
  children: string
  onClick?: () => void
  style?: CSSProperties
}

export default function DangerButton({ children, onClick, style }: Props) {
	return (
		<button className={`${styles.button} ${styles.danger}`} style={style} onClick={onClick}>
			{children}
		</button>
	);
}