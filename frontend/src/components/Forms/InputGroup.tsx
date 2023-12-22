import React, { ReactElement } from 'react';

interface Props {
  children: [ReactElement, ReactElement]
}

export default function InputGroup({ children }: Props) {
	return (
		<div className="input-group mb-3">
			{children[0]}
			<span className="input-group-text" id="basic-addon2">
				{children[1]}
			</span>
		</div>
	);
}