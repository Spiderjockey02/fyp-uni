import SuccessButton from '@/components/Buttons/Success';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import TextField from '@/components/Forms/TextField';
import CheckField from '@/components/Forms/CheckField';
import Link from 'next/link';
import { Card, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Error {
	type: 'firstName' | 'lastName' | 'email' | 'password' | 'repPassword'
	message: string
}

export default function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repPassword, setRepPassword] = useState('');
	const [accepted, setAccepted] = useState(false);
	const [errors, setErrors] = useState<Array<Error>>([]);
	const router = useRouter();

	// Validate and submit form
	async function submit() {
		const error = [] as Array<Error>;

		// Check user has accepted Terms of Use & Privacy Policy
		if (!accepted) return alert('Must accept Terms of Use & Privacy Policy');

		// Check empty fields
		if (firstName.length == 0) error.push({ type: 'firstName', message: 'Missing first name.' });
		if (lastName.length == 0) error.push({ type: 'lastName', message: 'Missing last name.' });
		if (email.length == 0) error.push({ type: 'email', message: 'Missing email.' });
		if (password.length == 0) error.push({ type: 'password', message: 'Missing password.' });
		if (repPassword.length == 0) error.push({ type: 'repPassword', message: 'Missing password.' });

		// Validate inputs
		if (password != repPassword) error.push({ type: 'repPassword', message: 'Password does not match.' });
		if (password.length < 8) error.push({ type: 'password', message: 'Password must be atleast 8 characters.' });
		if (!password.match(/[0-9]/g) || !password.match(/[A-Z]/g)) error.push({ type: 'password', message: 'Password must contain atleast a number and a capital letter.' });

		// Check for error if none send request
		if (error.length > 0) return setErrors(error);
		const { data } = await axios.post('/api/session/register', {
			firstName, lastName, email, password,
		});

		if (data.error) return setErrors([data.error]);
		router.push('/login');
	}

	return (
		<section style={{ minHeight: '100vh!important' }}>
			<Container style={{ backgroundColor: 'white' }}>
				<Row className="d-flex justify-content-center align-items-center h-100" style={{ paddingTop: '15%' }}>
					<Col lg={8} xl={7}>
						<Card>
							<Card.Body>
								<Card.Title className="text-center h1 fw-bold">Register</Card.Title>
								<TextField label="First name:" id="firstName" onChange={(e) => setFirstName(e.target.value)} error={errors.find((e) => e.type == 'firstName')?.message} />
								<TextField label="Last name:" id="lastName" onChange={(e) => setLastName(e.target.value)} error={errors.find((e) => e.type == 'lastName')?.message} />
								<TextField label="Email:" id="email" type="email" onChange={(e) => setEmail(e.target.value)} error={errors.find((e) => e.type == 'email')?.message} />
								<TextField label="Password:" id="password" type="password" onChange={(e) => setPassword(e.target.value)} error={errors.find((e) => e.type == 'password')?.message} />
								<TextField label="Repeat Password:" id="repeatPassword" type="password" onChange={(e) => setRepPassword(e.target.value)} error={errors.find((e) => e.type == 'repPassword')?.message} />
								<CheckField label="I accept the Terms of Use & Privacy Policy" id="acceptTOS" onChange={(e) => setAccepted(e.target.checked)} />
								<SuccessButton onClick={() => submit()}>Submit</SuccessButton>
								<p>Already have an account? <Link href="/login">Login</Link></p>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	);
}
