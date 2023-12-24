import Link from 'next/link';
import styles from '@/styles/Button.module.css';
import type { CSSProperties, ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode
	className?: string
  style?: CSSProperties
	href?: string
	onClick?: () => void
}


export default function LinkButton({ children, className, href, style, onClick }: Props): ReactElement {
	return (
		<Link className={`${styles.link} ${className == undefined ? '' : className}`} href={href == undefined ? '' : href} style={style} onClick={onClick}>
			{children}
		</Link>
	);
}