import Link from 'next/link';
import Image from 'next/image';
import { formatViews, concatNames } from '@/utils';
import { Video } from '@/types';

interface Props {
  video: Video
}

export default function VideoContainer({ video }: Props) {
	return (
		<div className="vid-list">
			<div className="thumbnail-container">
				<Image className="thumbnail" src="/imgs/thumbnail.webp" width={250} height={150} alt="Thumbnail of video" />
				<p className="time-overlay">23:23</p>
			</div>
			<div className="flex-div">
				<img src="/imgs/person.jpg" />
				<div className="vid-info">
					<Link href={`/watch?id=${video.id}`}><h3 style={{ maxWidth: '210px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{video.title}</h3></Link>
					<Link href={`/channel/${video.owner?.id}`}><p>{concatNames(video.owner)}</p></Link>
					<p>{formatViews(video.views)} views &bull; 2 days</p>
				</div>
			</div>
		</div>
	);
}
