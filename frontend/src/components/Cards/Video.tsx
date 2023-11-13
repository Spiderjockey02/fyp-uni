import Link from 'next/link';
import Image from 'next/image';
import { formatViews, concatNames, msToTime } from '@/utils';
import { useRouter } from 'next/router';
import type { Video } from '@/types';

interface Props {
  video: Video
}

export default function VideoContainer({ video }: Props) {
	const router = useRouter();

	return (
		<div className="vid-list" onClick={() => router.push(`/watch?id=${video.id}`) }>
			<div className="thumbnail-container">
				<Image className="thumbnail" src="/imgs/thumbnail.webp" width={250} height={150} alt="Thumbnail of video" />
				<p className="time-overlay">{msToTime((0.5 * 23) * 60 * 1000)}</p>
			</div>
			<div className="flex-div">
				<Image src="/imgs/person.jpg" width={35} height={35} alt="Users avatar" />
				<div className="vid-info">
					<Link href={`/watch?id=${video.id}`}>
						<h3 className="vid-title">{video.title}</h3>
					</Link>
					<Link href={`/channel/${video.owner?.id}`}><p>{concatNames(video.owner)}</p></Link>
					<p>{formatViews(video.views)} views &bull; 2 days</p>
				</div>
			</div>
		</div>
	);
}
