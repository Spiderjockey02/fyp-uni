import client from './client';
import { CONSTANTS } from '../utils';


export async function getVideoById(id: number) {
	return client.video.findUnique({
		where: {
			id,
		},
	});
}


export async function getAllVideos(page = 0) {
	return client.video.findMany({
		skip: page * CONSTANTS.docsPerPage,
		take: CONSTANTS.docsPerPage,
	});
}