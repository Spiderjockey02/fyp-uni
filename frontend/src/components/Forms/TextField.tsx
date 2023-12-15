import styles from '@/styles/Form.module.css';
import type { ChangeEvent } from 'react';

interface Props {
  label: string
	id: string
	type?: 'text' | 'email' | 'password'
	error?: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function TextField({ label, id, type = 'text', error = '', onChange }: Props) {
	return (
		<div>
			<label className={styles['form-label']} htmlFor={id}>{label}</label>
			<input className={`${styles['form-control']} ${error.length > 0 ? styles['form-input-error'] : ''}`} id={id} type={type} placeholder={`Type your ${label}`} name={id} onChange={onChange}/>
			{error?.length > 0 ? <div id="passwordHelpBlock" className={styles['form-text']}>
  			{error}
			</div>
				: null}
			&nbsp;
		</div>
	);
}
