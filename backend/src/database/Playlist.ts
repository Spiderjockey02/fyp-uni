import client from './client';

export async function getAllPlaylists(includeVideos = false) {
	return client.playlist.findMany({
		include: {
			videos: includeVideos,
		},
	});
}

export async function getPlaylistsByName(title: string) {
	return client.playlist.findMany({
		where: {
			title: title,
		},
	});
}
