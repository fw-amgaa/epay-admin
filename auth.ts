import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { object, string, z } from 'zod';
import { authError } from './lib/constants';

export const signInSchema = object({
    identifier: string(),
    password: string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            type: 'credentials',
            credentials: {
                identifier: {
                    label: 'Identifier',
                    type: 'email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                const { identifier, password } = await signInSchema.parseAsync(credentials);

                const response = await fetch(process.env.API_URL! + '/auth/local', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({ identifier, password }),
                });

                // console.log(identifier, password);
                // console.log('response.status', response.status);

                if (response.status !== 200) {
                    return { error: authError };
                }

                const body = await response.json();
                // console.log('body:', body);

                return { ...body.user, jwt: body.jwt };
            },
        }),
    ],
    callbacks: {
        // eslint-disable-next-line
        async signIn({ user }: any) {
            if (user?.error === authError) {
                throw new Error('custom error to the client');
            }
            return true;
        },
        jwt: ({ user, token }) => {
            if (user) {
                token.user = user;
            }

            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                // eslint-disable-next-line
                session.user = token.user as any;
            }

            return session;
        },
    },
    secret: `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`,
});
