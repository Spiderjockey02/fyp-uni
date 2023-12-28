import { ReactNode } from 'react';
import styles from '@/styles/Modal.module.css';

interface Props {
  id: string
	title: string
	children: ReactNode
	show: boolean
	setShowModal: () => void
}

export default function Modal({ id, title, children, show, setShowModal }: Props) {
	return (
		<div className={`modal fade ${show ? 'show' : ''}`} tabIndex={-1} id={id} style={{ display:`${show ? 'block' : 'none'}` }}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
					</div>
					<div className="modal-body">
						{children}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
					</div>
				</div>
			</div>
		</div>
	);
}