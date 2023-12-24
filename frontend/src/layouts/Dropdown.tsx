import { LinkButton } from '@/components/Buttons';
import styles from '@/styles/Dropdown.module.css';
import { ReactElement, useState, ReactNode } from 'react';

interface Props {
	button: ReactElement
	children: ReactNode
}

function Dropdown({ button, children }: Props) {
	const [show, setShow] = useState(false);
	return (
		<div className={styles.dropdown}>
			<LinkButton onClick={() => setShow(!show)} style={{ color: 'white', display: 'inline-block' }}>
				{button}
			</LinkButton>
			<ul className={`${styles['dropdown-menu']} ${show ? styles.show : ''}`}>
				{children}
			</ul>
		</div>
	);
}

interface DropdownItemProps {
	children: ReactNode
}

function DropdownItem({ children }: DropdownItemProps): ReactElement {
	return (
		<li>
			{children}
		</li>
	);
}

interface DropdownItemButtonProps {
	children: ReactNode
	href?: string
	onClick?: () => void
}

function DropdownItemButton({ children, href, onClick }: DropdownItemButtonProps) {
	return (
		<LinkButton href={href} className={styles['dropdown-item']} onClick={onClick}>{children}</LinkButton>
	);
}


Dropdown.DropdownItem = DropdownItem;
Dropdown.DropdownItemButton = DropdownItemButton;
export default Dropdown;