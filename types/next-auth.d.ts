import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: number | null
      name?: string | null
      email?: string | null
      image?: string | null
      username?: string | null
      bio?: string | null
    }
  }
}