export interface User {
  id: string
  firstName: string
  lastName: string
	email: string
	password: string
	role: 'USER' | 'INFLUENCER'
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & User
  }
}
