interface includeUserRelations {
	includeVideos?: boolean
	includePlaylist?: boolean
}

export interface email {
  email: string
}

export interface fetchUsersParam extends includeUserRelations {
  page: number
}

export interface fetchUserByIdParam extends includeUserRelations {
  id: number
}

export interface createUserParam {
	firstName: string
	lastName: string
	email: string
	password: string
}


interface includeVideos {
	includeVideos?: boolean
}

export interface fetchPlaylistsParam extends includeVideos {
  page: number
}

export interface fetchPlaylistsByNameParam extends includeVideos {
  title: string
}

export interface fetchPlaylistByIdParam extends includeVideos {
  id: number
}

export interface createPlaylist {
	title: string
	userId: number
}


interface includeVideoRelations {
	includePlaylist?: boolean
	includeOwner?: boolean
}


export interface fetchVideosParam extends includeVideoRelations {
	page: number
}

export interface fetchVideoByIdParam extends includeVideoRelations {
	id: number
}

export interface createVideo {
	title: string
	userId: number
	playlistId: number
}