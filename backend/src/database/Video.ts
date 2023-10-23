import client from './client';
import { CONSTANTS } from '../utils';

interface includeRelations {
	includePlaylist?: boolean
	includeOwner?: boolean
}


export async function fetchVideos({ includeOwner, includePlaylist, page }: includeRelations & { page: number }) {
	return client.video.findMany({
		skip: page * CONSTANTS.docsPerPage,
		take: CONSTANTS.docsPerPage,
		include: {
			playlists: includePlaylist,
			owner: includeOwner,
		},
	});
}


export async function fetchVideoById({ includeOwner, includePlaylist, id }: includeRelations & { id: number }) {
	return client.video.findUnique({
		where: {
			id,
		},
		include: {
			playlists: includePlaylist,
			owner: includeOwner,
		},
	});
}


export async function fetchVideoCount() {
	return client.video.count();
}
