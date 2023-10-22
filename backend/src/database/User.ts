import client from './client';

export async function getAllUsers() {
	return client.user.findMany({});
}

export async function getUserById(id: number) {
	return client.user.findUnique({
		where: {
			id,
		},
	});
}
