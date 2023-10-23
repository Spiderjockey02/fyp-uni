import Footer from '@/components/navbars/Footer';
import Main from '@/components/navbars/Main';
import { ReactElement } from 'react';

interface Props {
	children: ReactElement
}
export default function MainLayout({ children }: Props) {
	return (
		<>
    	<Main />
			{children}
			<Footer />
		</>
	);
}