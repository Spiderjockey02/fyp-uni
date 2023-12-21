import Link from 'next/link';
import styles from '@/styles/Button.module.css';
import type { CSSProperties } from 'react';

interface Props {
  children: string
  style?: CSSProperties
	href: string
}


export default function LinkButton({ children, href, style }: Props) {
	return (
		<Link className={styles.link} href={href} style={style}>
			{children}
		</Link>
	);
}