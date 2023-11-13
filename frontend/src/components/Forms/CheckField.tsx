import styles from '@/styles/Form.module.css';
import type { ChangeEvent } from 'react';

interface Props {
	label: string
	id: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export default function CheckField({ label, id, onChange }: Props) {
	return (
		<div className={styles['form-check']}>
			<input className={styles['form-check-input']} type="checkbox" id={id} onChange={onChange}/>
			<label htmlFor={id}>
    		{label}
			</label>
		</div>
	);
}
