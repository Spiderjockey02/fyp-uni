export interface Video {
  id: number
  title: string
  views: number
  comments: number
  likes: number
  dislikes: number
  createdAt: Date
  ownerId: 2
  owner?: User
}

export interface Playlist {
  id: number
  title: string
  createdAt: Date
  updatedAt: Date
  ownerId: number
  videos: Array<Video>
}

export interface User {
  id: number
  firstName: string
  lastName: string
}
