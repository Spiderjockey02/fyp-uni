import Head from 'next/head';

interface Props {
  title?: string
}

export default function Header({ title = 'Video streaming Service | Home page' }: Props) {
	return (
		<Head>
			<title>{title}</title>
		</Head>
	);
}