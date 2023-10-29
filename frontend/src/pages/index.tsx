import axios from 'axios';
import PlaylistCarousel from '@/components/Carousels/Playlist';
import type { Video, Playlist } from '@/types';
import Carousel from '@/components/Carousels/Banner';
import MainLayout from '@/layouts/main';
import Link from 'next/link';
import VideoContainer from '@/components/VideoContainer';
import { useState } from 'react';

interface Props {
	videos: Array<Video>
	playlists: Array<Playlist>
	error?: string
}

export default function Home({ videos, playlists: pl, total }: Props) {

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
					{playlists.map((playlist) => (
						<>
							<Link href={`/playlist/${playlist.id}`}>
								<h2 className="font-weight-light">{playlist.title}</h2>
							</Link>
							<PlaylistCarousel>
								{videos.length > 0 && videos.sort((a, b) => a.createdAt - b.createdAt).map(video => (
									<VideoContainer key={video.id} video={video} />
								))}
							</PlaylistCarousel>
							{playlists.indexOf(playlist) !== playlists.length - 1 ? <hr style={{ borderColor: 'grey' }}/> : null}
						</>
					))}
				</div>
				{playlists.length !== total ? <button style={{ marginLeft: '47%' }} onClick={() => loadNextPlaylist()}>Load more</button> : null}
			</div>
		</MainLayout>
	);
}

export async function getServerSideProps() {
	try {
		const [{ data }, { data: data2 }] = await Promise.all([axios.get(`${process.env.BACKENDURL}/api/videos`), axios.get(`${process.env.BACKENDURL}/api/playlists`)]);
		return { props: { videos: data.videos, playlists: data2.playlists, total: data2.total } };
	} catch (error) {
		return { props: { videos: [], playlists:[], error: 'API server currently unavailable' } };
	}
}
