import styles from '@/styles/Form.module.css';
import type { ReactNode, ChangeEvent } from 'react';

interface Props {
  label: string
	id: string
	type?: 'text' | 'email' | 'password'
	error?: string
	onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  children: ReactNode
}

export default function SelectField({ label, id, type = 'text', error = '', onChange, children }: Props) {
	return (
		<div>
			<label className={styles['form-label']} htmlFor={id}>{label}</label>
			<select className={`${styles['form-select']}  ${error.length > 0 ? styles['form-input-error'] : ''}`} id={id} name={id} onChange={onChange}>
				{children}
			</select>
			{error?.length > 0 ? <div id="passwordHelpBlock" className={styles['form-text']}>
				{error}
			</div>
				: null}
    &nbsp;
		</div>
	);
}