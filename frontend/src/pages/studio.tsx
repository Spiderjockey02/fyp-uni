import MainLayout from '@/layouts/main';
import TextField from '@/components/Forms/TextField';
import SuccessButton from '@/components/Buttons/Success';
import { useSession } from 'next-auth/react';
import { Row, Col } from '@/layouts/Grid';
import Card from '@/components/Cards/Card';
import FileUploadField from '@/components/Forms/FileUpload';
import SelectField from '@/components/Forms/SelectField';
import { Playlist } from '@/types';
import axios from 'axios';
import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

interface Props {
	playlists: Array<Playlist>
}

export default function Upload({ playlists }: Props) {
	const { data: session, status } = useSession();
	if (status == 'loading') return null;

	return (
		<MainLayout user={session?.user}>
			<section style={{ minHeight: '100vh!important' }}>
				<div>
					<Row className="d-flex justify-content-center align-items-center h-100" style={{ paddingTop: '15%', justifyContent: 'center', display: 'flex' }}>
						<Col lg={8} xl={7}>
							<Card>
								<Card.Body>
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
												{playlists.map(p => (
													<option value={p.id} key={p.id}>{p.title}</option>
												))}
											</SelectField>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			</section>
		</MainLayout>
	);
}

// Fetch the users playlist for selection
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const session = await getServerSession(ctx.req, ctx.res, authOptions);
	console.log(session);
	try {
		const { data } = await axios.get(`${process.env.BACKEND_URL}api/users/${ctx}/playlists`, {
			method: 'get',
			headers: {
				'cookie': ctx.req.headers.cookie as string,
			},
		});
		return { props: { playlists: data.playlists } };
	} catch (err) {
		return { props: { playlists: [] } };
	}
}
