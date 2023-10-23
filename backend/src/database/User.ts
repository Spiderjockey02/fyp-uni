import client from './client';

interface includeRelations {
	includeVideos?: boolean
	includePlaylist?: boolean
}

export async function fetchUsers({ includePlaylist, includeVideos, page }: includeRelations & { page: number }) {
	return client.user.findMany({
		skip: page * 10,
		take: 10,
		include: {
			videos: includeVideos,
			playlists: includePlaylist,
		},
	});
}

export async function fetchUserById({ includePlaylist, includeVideos, id }: includeRelations & { id: number }) {
	return client.user.findUnique({
		where: {
			id,
		},
		include: {
			videos: includeVideos,
			playlists: includePlaylist,
		},
	});
}

export async function fetchUserCount() {
	return client.user.count();
}
