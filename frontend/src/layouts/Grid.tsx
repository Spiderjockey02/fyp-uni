import styles from '@/styles/Grid.module.scss';
import { ReactElement } from 'react';
import { CSSProperties } from 'react';

interface Props {
	children?: Array<ReactElement> | ReactElement
	className?: string
	style?: CSSProperties
}

export function Row({ children, className, style }: Props) {
	return (
		<div className={`${styles.row} ${className != undefined ? className : ''}`} style={style}>
			{children}
		</div>
	);
}

interface Col {
	xs?: number
	sm?: number
	md?: number
	lg?: number
	xl?: number
	xxl?: number
}


export function Col({ children, className, style, xs, sm, md, lg, xl, xxl }: Col & Props) {
	const columns = columnCreator({ xs, sm, md, lg, xl, xxl });
	return (
		<div className={`${styles.col} ${className != undefined ? className : ''} ${columns.map(c => styles[c]).join(' ')}`} style={style}>
			{children}
		</div>
	);
}

function columnCreator({ xs, sm, md, lg, xl, xxl }: Col) {
	const columns = [];
	if (xs !== undefined && (xs >= 0 || xs <= 12)) columns.push(`col-xs-${xs}`);
	if (sm !== undefined && (sm >= 0 || sm <= 12)) columns.push(`col-sm-${sm}`);
	if (md !== undefined && (md >= 0 || md <= 12)) columns.push(`col-md-${md}`);
	if (lg !== undefined && (lg >= 0 || lg <= 12)) columns.push(`col-lg-${lg}`);
	if (xl !== undefined && (xl >= 0 || xl <= 12)) columns.push(`col-xl-${xl}`);
	if (xxl !== undefined && (xxl >= 0 || xxl <= 12)) columns.push(`col-xxl-${xxl}`);

	return columns;
}