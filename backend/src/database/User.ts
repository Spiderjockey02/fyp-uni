import client from './client';

export async function getUsers() {
	return client.user.findMany({});
}