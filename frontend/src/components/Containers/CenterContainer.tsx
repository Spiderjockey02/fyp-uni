import type { CSSProperties, ReactElement } from 'react';

interface Props {
  children: ReactElement | Array<ReactElement>
	style?: CSSProperties
}

export default function CenterContainer({ children, style }: Props) {
	return (
		<div className="center" style={style}>
			{children}
		</div>
	);
}