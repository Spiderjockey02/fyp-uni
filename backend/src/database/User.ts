import client from './client';
import type { User, Role } from '@prisma/client';
import type { fetchUsersParam, fetchUserByIdParam, createUserParam } from '../types/databaseParams';


/**
	* Fetches an array of users
	* @param {fetchUsersParam} data
	* @returns {Promise<Array<User>>}
*/
export async function fetchUsers({ includePlaylist, includeVideos, page }: fetchUsersParam): Promise<Array<User>> {
	return client.user.findMany({
		skip: page * 10,
		take: 10,
		include: {
			videos: includeVideos,
			playlists: includePlaylist,
		},
	});
}

/**
	* Fetches a user based on their Id
	* @param {fetchUserByIdParam} data
	* @returns {Promise<User|null>}
*/
export async function fetchUserById({ includePlaylist, includeVideos, id }: fetchUserByIdParam): Promise<User | null> {
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

/**
	* Fetches a user based on their email
	* @param {string} email
	* @returns {Promise<User|null>}
*/
export async function fetchUserByEmail(email: string): Promise<User | null> {
	return client.user.findUnique({
		where: {
			email,
		},
	});
}

/**
	* Fetches the total users saved on the database
	* @returns {Promise<number>}
*/
export async function fetchUserCount(): Promise<number> {
	return client.user.count();
}

/**
	* Creates a new user
	* @param {createUserParam} data The user class
	* @returns {Promise<User>}
*/
export async function createUser(data: createUserParam): Promise<User> {
	return client.user.create({
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		},
	});
}

type updateUserParam = {
	userId: number
	firstName?: string
	lastName?: string
	email?: string
	password?: string
	role?: Role
}


export async function updateUser(data: updateUserParam): Promise<User> {
	return client.user.update({
		where: {
			id: data.userId,
		},
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
			role: data.role,
		},
	});
}