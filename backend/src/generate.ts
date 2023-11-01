import { createUser } from './database/User';
import { createVideo } from './database/Video';
import { createPlaylist } from './database/Playlist';
import { faker } from '@faker-js/faker';


(async () => {
	const numOfUsers = 10;
	const numOfPlaylists = 20;
	const numOfVideos = 50;


	// Add all new users
	for (let i = 0; i < numOfUsers; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		await createUser({
			firstName: firstName,
			lastName: lastName,
			password: faker.string.sample(),
			email: faker.internet.email({ firstName: firstName, lastName: lastName }),
		});
	}

	// Add all new playlist
	for (let i = 0; i < numOfPlaylists; i++) {
		await createPlaylist({
			title: faker.lorem.text(),
			userId: Math.floor(Math.random() * numOfUsers - 1) + 1,
		});
	}

	// Add all new videos
	for (let i = 0; i < numOfVideos; i++) {
		await createVideo({
			title: faker.lorem.text(),
			userId: Math.floor(Math.random() * numOfUsers - 1) + 1,
			playlistId: Math.floor(Math.random() * numOfPlaylists - 1) + 1,
		});
	}
})();