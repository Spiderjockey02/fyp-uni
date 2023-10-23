import { Video, Playlist } from '@/types';
import VideoContainer from './VideoContainer';
import Link from 'next/link';

interface Props {
  videos: Array<Video>
  playlist: Playlist
}

export default function PlaylistCarousel({ playlist, videos }: Props) {
	return (
		<div style={{ padding: '10px' }}>
			<Link href={`/playlist/${playlist.id}`}>
				<h2 className="font-weight-light">{playlist.title}</h2>
			</Link>
			<div className="list-container">
				{videos.map(video => (
					<VideoContainer key={video.id} video={video} />
				))}
			</div>
		</div>
	);
}
