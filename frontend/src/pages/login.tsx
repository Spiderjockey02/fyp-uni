import TextField from '@/components/Forms/TextField';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import type { SignInResponse } from 'next-auth/react';
import SuccessButton from '@/components/Buttons/Success';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { Row, Col } from '@/layouts/Grid';
import Card, { Body, Title } from '@/components/Cards/Card';
interface Error {
	type: 'email' | 'password'
	message: string
}

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<Array<Error>>([]);
	const router = useRouter();

	async function submit() {
		const error = [] as Array<Error>;

		if (email.length == 0) error.push({ type: 'email', message: 'Missing email.' });
		if (password.length == 0) error.push({ type: 'password', message: 'Missing password.' });

		// Check for error if none send request
		if (error.length > 0) return setErrors(error);
		const res = await signIn('credentials', {
			redirect: false,
			callbackUrl: '/',
			email, password,
		}) as SignInResponse;

		if (res.error) return setErrors([{ type: 'email', message: 'Failed to login' }]);

		// Move to the callback URL so user knows they are logged in
		router.push(res.url as string);
	}

	return (
		<section style={{ minHeight: '100vh!important' }}>
			<div>
				<Row className="d-flex justify-content-center align-items-center h-100" style={{ paddingTop: '15%', justifyContent: 'center!important', display: 'flex!important' }}>
					<Col lg={8} xl={7}>
						<Card>
							<Body>
								<>
									<Title className="text-center h1 fw-bold"><p>Login</p></Title>
									<TextField label='Email:' id="email" onChange={(e) => setEmail(e.target.value)} error={errors.find((e) => e.type == 'email')?.message} />
									<TextField label="Password:" id="password" type="password" onChange={(e) => setPassword(e.target.value)} error={errors.find((e) => e.type == 'password')?.message} />
									<p>Need an account? <Link href="/register">Register</Link></p>
									<SuccessButton onClick={() => submit()}>Submit</SuccessButton>
								</>
							</Body>
						</Card>
					</Col>
				</Row>
			</div>
		</section>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	// Only show this page if they are not logged in
	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	} else {
		return { props: {} };
	}
}
