import axios from 'axios';
import PlaylistCarousel from '@/components/PlaylistCarousel';
import type { Video, Playlist } from '@/types';
import Carousel from '@/components/Carousel';
import MainLayout from '@/layouts/main';

interface Props {
	videos: Array<Video>
	playlists: Array<Playlist>
	error?: string
}

export default function Home({ videos, playlists }: Props) {
	return (
		<MainLayout>
			<div className="container-fluid">
				{/* Recently uploaded content carousel */}
				<Carousel/>

				{/* Upload playlists */}
				<div className="container">
					{playlists.map(playlist => (
						<>
							<PlaylistCarousel playlist={playlist} videos={videos.filter(() => Math.random() > 0.8)} />
							<hr style={{ borderColor: 'grey' }}/>
						</>
					))}
				</div>
			</div>
		</MainLayout>
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
