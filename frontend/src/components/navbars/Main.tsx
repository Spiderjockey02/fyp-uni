import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUpload, faBell } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
	return (
		<nav className="flex-div">
			<div className="nav-left flex-div">
				<Link href="/">
					<Image className="logo" src="https://placehold.co/130x30" width={130} height={30} alt="logo" />
				</Link>
			</div>
			<div className="nav-middle flex-div">
				<div className="search-box flex-div">
					<input type="text" placeholder="Search" />
					<a href="/search">
						<FontAwesomeIcon icon={faSearch} width={15} height={15} />
					</a>
				</div>
			</div>
			<div className="nav-right flex-div">
				<FontAwesomeIcon icon={faUpload} width={25} height={25} />
				<FontAwesomeIcon icon={faBell} width={25} height={25} />
				<Image className="user-icon" src="https://placehold.co/35x35" width={35} height={35} alt="menu" />
			</div>
		</nav>
	);
}
