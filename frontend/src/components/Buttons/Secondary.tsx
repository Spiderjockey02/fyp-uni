import styles from '@/styles/Button.module.css';
import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode
  onClick?: () => void
  style?: CSSProperties
}

export default function SecondaryButton({ children, onClick, style }: Props) {
	return (
		<button className={`${styles.button} ${styles.secondary}`} style={style} onClick={onClick}>
			{children}
		</button>
	);
}