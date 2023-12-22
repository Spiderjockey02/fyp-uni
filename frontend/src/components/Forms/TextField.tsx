import styles from '@/styles/Form.module.css';
import type { ChangeEvent } from 'react';
import { LinkButton } from '../Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface Props {
  label: string
	id: string
	type?: 'text' | 'email' | 'password'
	error?: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function TextField({ label, id, type = 'text', error = '', onChange }: Props) {
	const [hidden, setHidden] = useState(false);

	return (
		<div>
			<label className={styles['form-label']} htmlFor={id}>{label}</label>
			<div className={styles['form-group']}>
				<input className={`${styles['form-control']} ${error.length > 0 ? styles['form-input-error'] : ''}`} id={id} type={type == 'password' ? (hidden ? 'text' : 'password') : type} placeholder={`Type your ${label}`} name={id} onChange={onChange}/>
				{type == 'password' ?
					<LinkButton onClick={() => setHidden(!hidden)} className={styles['form-button']}>
						{hidden ? <FontAwesomeIcon icon={faEye} width={15} height={15} /> : <FontAwesomeIcon icon={faEyeSlash} width={15} height={15} />}
					</LinkButton>
					: null
				}
			</div>

			{error?.length > 0 ? <div id="passwordHelpBlock" className={styles['form-text']}>
  			{error}
			</div>
				: null}
			&nbsp;
		</div>
	);
}
