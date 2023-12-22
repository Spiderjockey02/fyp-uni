import Link from 'next/link';
import styles from '@/styles/Button.module.css';
import type { CSSProperties, ReactElement } from 'react';

interface Props {
  children: string | ReactElement | Array<ReactElement>
	className?: string
  style?: CSSProperties
	href?: string
	onClick?: () => void
}


export default function LinkButton({ children, className, href, style, onClick }: Props) {
	return (
		<Link className={`${styles.link} ${className == undefined ? '' : className}`} href={href == undefined ? '' : href} style={style} onClick={onClick}>
			{children}
		</Link>
	);
}