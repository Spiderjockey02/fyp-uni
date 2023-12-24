import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUpload, faBell, faGear, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import type { User } from '@/types/next-auth';
import { LinkButton } from '../Buttons';
import Dropdown from '@/layouts/Dropdown';
import { signOut } from 'next-auth/react';

interface Props {
	user: User | undefined
}

export default function NavBar({ user }: Props) {
	return (
		<nav className="flex-div">
			<div className="nav-left flex-div">
				<Link href="/">
					<Image className="logo" src="https://placehold.co/130x30" width={130} height={30} alt="logo" />
				</Link>
			</div>
			<div className="nav-middle flex-div">
				<div className="search-box flex-div">
					<input type="text" placeholder="Search" style={{ color: 'white' }} />
					<LinkButton href="/search" style={{ color: 'white' }}>
						<FontAwesomeIcon icon={faSearch} width={15} height={15} />
					</LinkButton>
				</div>
			</div>
			<div className="nav-right flex-div">
				{user === undefined ?
					<LinkButton href="/login" style={{ color: 'white' }}>Login</LinkButton>
					:
					<>
						<FontAwesomeIcon icon={faUpload} width={25} height={25} color='white' />
						<FontAwesomeIcon icon={faBell} width={25} height={25} color='white' />
						<Dropdown button={
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Image className="user-icon" src="https://placehold.co/35x35" width={35} height={35} alt="Avatar icon" />	{user.firstName} {user.lastName}
							</div>
						}>
							<Dropdown.DropdownItem>
								<Dropdown.DropdownItemButton href="/settings">
									<FontAwesomeIcon icon={faGear} /> Settings
								</Dropdown.DropdownItemButton>
							</Dropdown.DropdownItem>
							{user.role == 'INFLUENCER' &&
								<Dropdown.DropdownItem>
									<Dropdown.DropdownItemButton href="/studio">
										<FontAwesomeIcon icon={faHouse} /> Studio
									</Dropdown.DropdownItemButton>
								</Dropdown.DropdownItem>
							}
							<Dropdown.DropdownItem>
								<Dropdown.DropdownItemButton href="/settings">
									<FontAwesomeIcon icon={faUser} /> Profile
								</Dropdown.DropdownItemButton>
							</Dropdown.DropdownItem>
							<Dropdown.DropdownItem>
								<Dropdown.DropdownItemButton onClick={() => signOut()}>
									Logout
								</Dropdown.DropdownItemButton>
							</Dropdown.DropdownItem>
						</Dropdown>
					</>
				}
			</div>
		</nav>
	);
}
