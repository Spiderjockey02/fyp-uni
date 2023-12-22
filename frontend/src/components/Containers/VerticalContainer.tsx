import type { CSSProperties, ReactElement } from 'react';

interface Props {
  children: ReactElement | Array<ReactElement>
	style?: CSSProperties
}

export default function VerticalContainer({ children, style }: Props) {
	return (
		<div className="vertical-center" style={style}>
			{children}
		</div>
	);
}