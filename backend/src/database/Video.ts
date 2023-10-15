import client from './client';
import { CONSTANTS } from '../utils';

export async function getVideos(page = 0) {
	return client.video.findMany({
		skip: page * CONSTANTS.docsPerPage,
		take: CONSTANTS.docsPerPage,
	});
}