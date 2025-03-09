'use client';

import { Refine, type AuthProvider } from '@refinedev/core';
import { RefineKbarProvider } from '@refinedev/kbar';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';

import routerProvider from '@refinedev/nextjs-router';

import { dataProvider } from '@/providers/data-provider';
import { MainProviders } from '@/providers/main-providers';
import resources from './resources';

type RefineContextProps = object;

export const RefineContext = (props: React.PropsWithChildren<RefineContextProps>) => {
    return (
        <MainProviders>
            <App {...props} />
        </MainProviders>
    );
};

type AppProps = object;

const App = (props: React.PropsWithChildren<AppProps>) => {
    const { data, status } = useSession();
    const to = usePathname();

    const authProvider: AuthProvider = {
        login: async ({ identifier, password }: { identifier: string; password: string }) => {
            const signUpResponse = await signIn('credentials', {
                identifier,
                password,
                callbackUrl: to ? to.toString() : '/',
                redirect: false,
            });

            if (!signUpResponse) {
                return {
                    success: false,
                };
            }

            const { ok, error } = signUpResponse;

            if (ok) {
                return {
                    success: true,
                    redirectTo: '/',
                };
            }

            return {
                success: false,
                error: new Error(error?.toString()),
            };
        },
        logout: async () => {
            signOut({
                redirect: true,
                callbackUrl: '/login',
            });

            return {
                success: true,
            };
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: async (error: any) => {
            if (error.response?.status === 401) {
                return {
                    logout: true,
                };
            }

            return {
                error,
            };
        },
        check: async () => {
            if (status === 'unauthenticated') {
                return {
                    authenticated: false,
                    redirectTo: '/login',
                };
            }

            return {
                authenticated: true,
            };
        },
        getPermissions: async () => {
            return null;
        },
        getIdentity: async () => {
            if (data?.user) {
                const { user } = data;
                return {
                    name: user.username,
                };
            }

            return null;
        },
    };

    return (
        <>
            <RefineKbarProvider>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={{ default: dataProvider(process.env.API_URL!) }}
                    authProvider={authProvider}
                    resources={resources}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        useNewQueryKeys: true,
                    }}
                >
                    {props.children}
                </Refine>
            </RefineKbarProvider>
        </>
    );
};
