import styles from '@/styles/Sidebar.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode
}

export default function Sidebar({ children }: Props) {
	return (
		<div className={styles.sidebar}>
			{children}
		</div>
	);
}