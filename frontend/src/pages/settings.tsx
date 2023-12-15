import MainLayout from '@/layouts/main';
import TextField from '@/components/Forms/TextField';
import SuccessButton from '@/components/Buttons/Success';
import { useSession } from 'next-auth/react';
import { Row, Col } from '@/layouts/Grid';
import Card, { Body, Title } from '@/components/Cards/Card';
import { FormEvent } from 'react';
import axios from 'axios';

export default function Settings() {
	const { data: session, status } = useSession();
	if (status == 'loading') return null;

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fields = {};
		const inputFields = [...e.target].filter(c => c.nodeName == 'INPUT').forEach(e => fields[e.name] = e.value);
		console.log(fields);

		const { data } = await axios.patch('/api/session/user', fields);
		console.log(data);
	}


	return (
		<MainLayout user={session?.user}>
			<Row style={{ justifyContent: 'center', display: 'flex', paddingTop: '5%' }}>
				<Col lg={8} xl={7}>
					<Card>
						<Body>
							<form onSubmit={(e) => onSubmit(e)}>
								<Title text={'Update'}></Title>
								<TextField label="first Name" id="firstName" />
								<TextField label="last Name" id="lastName" />
								<TextField label="email" id="email" type="email" />
								<TextField label="password" id="password" type="password" />
								<TextField label="repeat password" id="repPassword" type="password" />
								<SuccessButton>Submit</SuccessButton>
							</form>
						</Body>
					</Card>
				</Col>
			</Row>
		</MainLayout>
	);
}
