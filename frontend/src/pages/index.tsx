import axios from 'axios';
import PlaylistCarousel from '@/components/PlaylistCarousel';
import type { Video, Playlist } from '@/types';
import Carousel from '@/components/Carousel';
import MainLayout from '@/layouts/main';
import Link from 'next/link';
import VideoContainer from '@/components/VideoContainer';

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
				<Carousel images={['https://placehold.co/1080x300', 'https://placehold.co/1080x301', 'https://placehold.co/1080x302']}/>

				{/* Upload playlists */}
				<div className="container">
					{playlists.map(playlist => (
						<>
							<Link href={`/playlist/${playlist.id}`}>
								<h2 className="font-weight-light">{playlist.title}</h2>
							</Link>
							<PlaylistCarousel>
								{videos.filter(() => Math.random() > 0.5).map(video => (
									<VideoContainer key={video.id} video={video} />
								))}
							</PlaylistCarousel>
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
		console.log(data.videos.length);
		return { props: { videos: data.videos, playlists: data2.playlists } };
	} catch (error) {
		return { props: { videos: [], playlists:[], error: 'API server currently unavailable' } };
	}
}
