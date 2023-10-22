import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUpload, faBell } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
	return (
		<nav className="flex-div">
			<div className="nav-left flex-div">
				<Link href="/">
					<Image className="logo" src="/imgs/logo.png" width={130} height={30} alt="logo" />
				</Link>
			</div>
			<div className="nav-middle flex-div">
				<div className="search-box flex-div">
					<input type="text" placeholder="Search" />
					<FontAwesomeIcon icon={faSearch} width={15} height={15} />
				</div>
				<Image className="mic-icon" src="/imgs/voice-search.png" width={16} height={22} alt="voice search" />
			</div>
			<div className="nav-right flex-div">
				<FontAwesomeIcon icon={faUpload} width={25} height={25} />
				<Image src="/imgs/more.png" width={25} height={25} alt="menu" />
				<FontAwesomeIcon icon={faBell} width={25} height={25} />
				<Image className="user-icon" src="/imgs/Jack.png" width={35} height={35} alt="menu" />
			</div>
		</nav>
	);
}
