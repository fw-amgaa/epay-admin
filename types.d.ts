import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      jwt: string;
      id: number,
      documentId: string,
      username: string,
      email: string,
      provider: string,
      confirmed: boolean,
      blocked: boolean,
      createdAt: string,
      updatedAt: string,
      publishedAt: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      jwt: string;
      id: number,
      documentId: string,
      username: string,
      email: string,
      provider: string,
      confirmed: boolean,
      blocked: boolean,
      createdAt: string,
      updatedAt: string,
      publishedAt: string
    }
  }
}