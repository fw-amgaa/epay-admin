"use client";

import { Refine, type AuthProvider } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { Layout } from "@/components/layout";
import { dataProvider } from "@/providers/data-provider";
import { ChartPieIcon, DockIcon, ListCheckIcon, LockKeyholeOpen, PercentIcon, PlugIcon, User, UserCircle2Icon } from "lucide-react";

type RefineContextProps = {};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession();
  const to = usePathname();

  const authProvider: AuthProvider = {
    login: async () => {
      signIn("auth0", {
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
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
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
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
          name: user.name,
          avatar: user.image,
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
          dataProvider={dataProvider}
          authProvider={authProvider}
          resources={[
            {
              name: "blog_posts",
              list: "/blog-posts",
              create: "/blog-posts/create",
              edit: "/blog-posts/edit/:id",
              show: "/blog-posts/show/:id",
              meta: {
                canDelete: true,
                label: "Систем холболт",
                icon: <PlugIcon />,
                group: 'system'
              },
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                canDelete: true,
                label: "Хүсэлтийн жагсаалт",
                icon: <ListCheckIcon />,
                group: 'system'
              },
            },
            {
              name: "Гүйлгээний мэдээлэл",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                canDelete: true,
                label: "Гүйлгээний мэдээлэл",
                icon: <DockIcon />,
                group: 'system'
              },
            },
            {
              name: "Шимтгэл удирдлага",
              meta: {
                label: "Шимтгэл удирдлага",
                icon: <PercentIcon />,
                group: 'system'
              }
            },
            {
              name: "Шимтгэл тохиргоо",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                canDelete: true,
                label: "Шимтгэл тохиргоо",
                parent: "Шимтгэл удирдлага",
                group: 'system'
              },
            },
            {
              name: "Шимтгэл тооцоолол",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                canDelete: true,
                label: "Шимтгэл тооцоолол",
                parent: "Шимтгэл удирдлага",
                group: 'system'
              },
            },
            {
              name: "Харилцагч удирдлага",
              meta: {
                label: "Харилцагч удирдлага",
                icon: <UserCircle2Icon />,
                group: 'system'
              }
            },
            {
              name: "Харилцагч",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                parent: "Харилцагч удирдлага",
                label: "Харилцагч",
                canDelete: true,
                group: 'system'
              },
            },
            {
              name: "Хэрэглэгч",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                parent: "Харилцагч удирдлага",
                label: "Хэрэглэгч",
                canDelete: true,
                group: 'system'
              },
            },
            {
              name: "Тайлан",
              meta: {
                label: "Тайлан",
                icon: <ChartPieIcon />,
                group: 'system'
              }
            },
            {
              name: "Харилцагчийн шимтгэл тооцоо нэхэмжлэх тайлан",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                parent: "Тайлан",
                label: "Харилцагчийн шимтгэл тооцоо нэхэмжлэх тайлан",
                canDelete: true,
                group: 'system'
              },
            },
            {
              name: "ePay-ийн баталгаажуулах тайлан",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                parent: "Тайлан",
                label: "ePay-ийн баталгаажуулах тайлан",
                canDelete: true,
                group: 'system'
              },
            },
            {
              name: "system_users",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                label: "Систем хэрэглэгч",
                canDelete: true,
                icon: <User />,
                group: 'user'
              },
            },
            {
              name: "user_access",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
              meta: {
                label: "Хандах эрх",
                canDelete: true,
                icon: <LockKeyholeOpen />,
                group: 'user'
              },
            },
          ]}
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
