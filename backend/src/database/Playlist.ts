import client from './client';

export default async function getPlaylists() {
	return client.playlist.findMany({});
}