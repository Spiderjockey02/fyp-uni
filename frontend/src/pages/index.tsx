import axios from 'axios';
import PlaylistCarousel from '@/components/Carousels/Playlist';
import type { Playlist } from '@/types';
import Carousel from '@/components/Carousels/Banner';
import MainLayout from '@/layouts/main';
import Link from 'next/link';
import VideoContainer from '@/components/Cards/Video';
import { useState } from 'react';
import PrimaryButton from '@/components/Buttons/Primary';

interface Props {
	playlists: Array<Playlist>
	error?: string
	total: number
}

export default function Home({ playlists: pl, total }: Props) {

	const [playlists, setPlaylists] = useState<Array<Playlist>>(pl);
	const [page, setPage] = useState(1);

	async function loadNextPlaylist() {
		try {
			const { data } = await axios.get(`/api/playlists?page=${page}`);
			setPage(page + 1);
			setPlaylists([...playlists, ...data.playlists]);
			console.log(playlists);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<MainLayout>
			<div className="container-fluid">
				{/* Recently uploaded content carousel */}
				<Carousel images={['https://placehold.co/1080x300', 'https://placehold.co/1080x301', 'https://placehold.co/1080x302']}/>

				{/* Upload playlists */}
				<div className="container">
					{playlists.filter(p => p.videos.length > 0).map((playlist) => (
						<>
							<Link href={`/playlist/${playlist.id}`}>
								<h2 className="playlist-title">{playlist.title}</h2>
							</Link>
							<PlaylistCarousel>
								{playlist.videos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map(video => (
									<VideoContainer key={video.id} video={video} />
								))}
							</PlaylistCarousel>
							{playlists.indexOf(playlist) !== playlists.length - 1 ? <hr style={{ borderColor: 'grey' }}/> : null}
						</>
					))}
				</div>
				{playlists.length !== total ? <PrimaryButton style={{ marginLeft: '47%' }} onClick={() => loadNextPlaylist()}>Load more</PrimaryButton> : null}
			</div>
		</MainLayout>
	);
}

export async function getServerSideProps() {
	try {
		const { data } = await axios.get(`${process.env.BACKENDURL}/api/playlists`);
		return { props: { playlists: data.playlists, total: data.total } };
	} catch (error) {
		return { props: { playlists: [], total: 0, error: 'API server currently unavailable' } };
	}
}
