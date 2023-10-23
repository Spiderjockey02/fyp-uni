import client from './client';

interface includeVideos {
	includeVideos?: boolean
}

export async function fetchPlaylists({ includeVideos, page }: includeVideos & { page: number }) {
	return client.playlist.findMany({
		skip: page * 10,
		take: 10,
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			videos: includeVideos,
		},
	});
}

export async function fetchPlaylistsByName({ includeVideos, title }: includeVideos & { title: string }) {
	return client.playlist.findMany({
		where: {
			title,
		},
		include: {
			videos: includeVideos,
		},
	});
}

export async function fetchPlaylistById({ includeVideos, id }: includeVideos & { id: number }) {
	return client.playlist.findUnique({
		where: {
			id,
		},
		include: {
			videos: includeVideos,
		},
	});
}

export async function fetchPlaylistCount() {
	return client.playlist.count();
}
