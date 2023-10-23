import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

config.autoAddCss = false;
export default function App({ Component, pageProps }: AppProps) {

	useEffect(() => {
		window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
	}, []);

	return <Component {...pageProps} />;
}
