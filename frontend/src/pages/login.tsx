import TextField from '@/components/Forms/TextField';
import { LinkButton, SecondaryButton } from '@/components/Buttons';
import Card from '@/components/Cards/Card';
import { Row, Col } from '@/layouts/Grid';
import VerticalContainer from '@/components/Containers/VerticalContainer';
import { getServerSession } from 'next-auth/next';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import type { SignInResponse } from 'next-auth/react';
import type { GetServerSidePropsContext } from 'next';

interface Error {
	type: 'email' | 'password'
	message: string
}

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<Array<Error>>([]);
	const router = useRouter();

	async function submit(e?: FormEvent<HTMLFormElement>) {
		e?.preventDefault();
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

		// Check for errors
		if (res.error) {
			switch (res.error) {
				case 'Email is incorrect':
					error.push({ type: 'email', message: res.error });
					break;
				case 'Password is incorrect':
					error.push({ type: 'password', message: res.error });
					break;
				default: error.push({ type: 'email', message: 'An error has occured, please try again.' });
			}
			return setErrors(error);
		}

		// Move to the callback URL so user knows they are logged in
		router.push(res.url as string);
	}

	return (
		<section style={{ minHeight: '100vh', backgroundColor: '#1c2831' }}>
			<VerticalContainer>
				<Row className='horizontal-center'>
					<Col lg={6} xl={6}>
						<Card style={{ boxShadow: '4px 4px #888888' }}>
							<Card.Body>
								<Card.Title text="Login" />
								<form onSubmit={(e) => submit(e)}>
									<TextField label='Email:' id="email" onChange={(e) => setEmail(e.target.value)} error={errors.find((e) => e.type == 'email')?.message} />
									<TextField label="Password:" id="password" type="password" onChange={(e) => setPassword(e.target.value)} error={errors.find((e) => e.type == 'password')?.message} />
									<p>Need an account? <LinkButton href="/register">Register</LinkButton></p>
									<SecondaryButton onClick={() => submit()} style={{ float: 'right' }}>Login</SecondaryButton>
								</form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</VerticalContainer>
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
