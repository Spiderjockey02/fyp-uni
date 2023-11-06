import client from './client';
import { CONSTANTS } from '../utils';
import type { fetchVideoByIdParam, fetchVideosParam, createVideo } from '../types/databaseParams';
import type { Video } from '@prisma/client';


/**
	* Fetches an array of videos
	* @param {fetchVideosParam} data
	* @returns {Promise<Array<Video>>}
*/
export async function fetchVideos({ includeOwner, includePlaylist, page }: fetchVideosParam): Promise<Array<Video>> {
	return client.video.findMany({
		skip: page * CONSTANTS.docsPerPage,
		take: CONSTANTS.docsPerPage,
		include: {
			playlists: includePlaylist,
			owner: includeOwner,
		},
	});
}

/**
	* Fetches a video based on their Id
	* @param {fetchVideoByIdParam} data
	* @returns {Promise<Video|null>}
*/
export async function fetchVideoById({ includeOwner, includePlaylist, id }: fetchVideoByIdParam): Promise<Video | null> {
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

/**
	* Fetches the total videos saved on the database
	* @returns {Promise<number>}
*/
export async function fetchVideoCount() {
	return client.video.count();
}

/**
	* Creates a new video
	* @param {createVideo} data The video class
	* @returns {Promise<Video>}
*/
export async function createVideo(data: createVideo) {
	return client.video.create({
		data: {
			title: data.title,
			owner: {
				connect: {
					id: data.userId,
				},
			},
			playlists: {
				connect: {
					id: data.playlistId,
				},
			},
		},
	});
}