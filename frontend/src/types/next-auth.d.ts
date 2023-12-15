export interface User {
  id: string
  firstName: string
  lastName: string
	email: string
	password: string
	role: 'USER' | 'INFLUENCER'
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: User
  }
}

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}