import MainLayout from '@/layouts/main';
import TextField from '@/components/Forms/TextField';
import SuccessButton from '@/components/Buttons/Success';
import { useSession } from 'next-auth/react';
import { Row, Col } from '@/layouts/Grid';
import Card, { Body } from '@/components/Cards/Card';
import FileUploadField from '@/components/Forms/FileUpload';
import SelectField from '@/components/Forms/SelectField';

export default function Upload() {
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
									<Row>
										<Col lg={6}>
											<form action="/api/videos/upload" method="post" encType="multipart/form-data">
												<FileUploadField/>
												<SuccessButton>submit</SuccessButton>
											</form>
										</Col>
										<Col lg={6}>
											<TextField label="Title:" id="title" />
											<TextField label="Description:" id="description" />
											<SelectField label="Playlist:" id="playlist">
												<option value="asdsad">asdasd</option>
												<option value="asds354ad">345</option>
											</SelectField>
										</Col>
									</Row>
								</Body>
							</Card>
						</Col>
					</Row>
				</div>
			</section>
		</MainLayout>
	);
}

// Fetch the users playlist for selection
export async function getServerSideProps() {
	return { props: {} };
}
