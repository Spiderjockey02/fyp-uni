import type { CSSProperties, ReactElement } from 'react';

interface Props {
  children: ReactElement | Array<ReactElement>
	style?: CSSProperties
}

export default function HorizontalContainer({ children, style }: Props) {
	return (
		<div className="horizontal-center" style={style}>
			{children}
		</div>
	);
}