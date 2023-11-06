import client from './client';
import type { fetchPlaylistByIdParam, fetchPlaylistsByNameParam, fetchPlaylistsParam, createPlaylist } from '../types/databaseParams';
import type { Playlist } from '@prisma/client';


/**
	* Fetches an array of playlists
	* @param {fetchUsersParam} data
	* @returns {Promise<Array<Playlist>>}
*/
export async function fetchPlaylists({ includeVideos, page }:fetchPlaylistsParam): Promise<Array<Playlist>> {
	return client.playlist.findMany({
		skip: page * 10,
		take: 10,
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			videos: includeVideos ? {
				include: {
					owner: true,
				},
			} : false,
		},
	});
}

/**
	* Fetches an array of playlists based on their name
	* @param {fetchUsersParam} data
	* @returns {Promise<Array<Playlist>>}
*/
export async function fetchPlaylistsByName({ includeVideos, title }: fetchPlaylistsByNameParam): Promise<Array<Playlist>> {
	return client.playlist.findMany({
		where: {
			title,
		},
		include: {
			videos: includeVideos,
		},
	});
}

/**
	* Fetches an array of playlists based on their id
	* @param {fetchUsersParam} data
	* @returns {Promise<Array<Playlist>>}
*/
export async function fetchPlaylistById({ includeVideos, id }: fetchPlaylistByIdParam): Promise<Playlist | null> {
	return client.playlist.findUnique({
		where: {
			id,
		},
		include: {
			videos: includeVideos,
		},
	});
}

/**
	* Fetches the total playlists saved on the database
	* @returns {Promise<number>}
*/
export async function fetchPlaylistCount() {
	return client.playlist.count();
}

/**
	* Creates a new playlist
	* @param {createPlaylist} data The playlist class
	* @returns {Promise<Playlist>}
*/
export async function createPlaylist(data: createPlaylist): Promise<Playlist> {
	return client.playlist.create({
		data: {
			title: data.title,
			owner: {
				connect: { id: data.userId },
			},
		},
	});
}

