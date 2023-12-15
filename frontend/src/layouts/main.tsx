import Footer from '@/components/navbars/Footer';
import Header from '@/components/navbars/Header';
import Main from '@/components/navbars/Main';
import { ReactElement } from 'react';
import type { User } from 'next-auth';

interface Props {
	children: ReactElement
	user: User | undefined
}
export default function MainLayout({ children, user }: Props) {
	return (
		<>
			<Header />
			<body style={{ minHeight: '100vh' }}>
    	<Main user={user} />
				{children}
				<Footer />
			</body>
		</>
	);
}