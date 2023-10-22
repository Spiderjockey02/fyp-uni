import axios from 'axios';
import PlaylistCarousel from '@/components/PlaylistCarousel';
import type { Video, Playlist } from '@/types';
import NavBar from '@/components/Navbar';
import Carousel from '@/components/Carousel';

interface Props {
	videos: Array<Video>
	playlists: Array<Playlist>
	error?: string
}

export default function Home({ videos, playlists, error }: Props) {
	return (
		<div className="container-fluid">
			{/* Navbar */}
			<NavBar />

			{/* Recently uploaded content carousel */}
			<Carousel/>

			{/* Upload playlists */}
			{playlists.map(playlist => (
				<PlaylistCarousel key={playlist.id} playlist={playlist} videos={videos.filter(() => Math.random() > 0.8)} />
			))}
		</div>
	);
}

export async function getServerSideProps() {
	try {
		const [{ data }, { data: data2 }] = await Promise.all([axios.get(`${process.env.BACKENDURL}/api/videos`), axios.get(`${process.env.BACKENDURL}/api/playlists`)]);
		return { props: { videos: data.videos, playlists: data2.playlists } };
	} catch (error) {
		return { props: { videos: [], playlists:[], error: 'API server currently unavailable' } };
	}
}
