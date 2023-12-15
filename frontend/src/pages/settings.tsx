import MainLayout from '@/layouts/main';
import TextField from '@/components/Forms/TextField';
import SuccessButton from '@/components/Buttons/Success';
import { useSession } from 'next-auth/react';
import { Row, Col } from '@/layouts/Grid';
import Card, { Body, Title } from '@/components/Cards/Card';

export default function Settings() {
	const { data: session, status } = useSession();
	if (status == 'loading') return null;

	return (
		<MainLayout user={session?.user}>
			<section style={{ minHeight: '100vh!important' }}>
				<div>
					<Row className="d-flex justify-content-center align-items-center h-100" style={{ paddingTop: '15%', justifyContent: 'center', display: 'flex' }}>
						<Col lg={8} xl={7}>
							<Card>
								<Body>
									<>
										<Title className="text-center h1 fw-bold"><p>Update</p></Title>
										<TextField label="first Name" id="firstName" />
										<TextField label="last Name" id="LastName" />
										<TextField label="email" id="email" type="email" />
										<TextField label="password" id="password" type="password" />
										<TextField label="repeat password" id="repPassword" type="password" />
										<SuccessButton>Submit</SuccessButton>
									</>
								</Body>
							</Card>
						</Col>
					</Row>
				</div>
			</section>
		</MainLayout>
	);
}