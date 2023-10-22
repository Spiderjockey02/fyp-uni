import { GetServerSidePropsContext } from 'next';

interface Props {
  playlist: string
}

export default function Playlist({ playlist }: Props) {
	return (
		<p>{playlist}</p>
	);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const name = ctx.params?.name;
	return { props: { playlist: name } };
}
