"use client";

import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string, jwt?: string): DataProvider => ({
    getOne: async ({ id, resource }) => {
        const response = await fetch(`${url}/${resource}/${id}`, {
            headers: {
                "Authorization": "Bearer " + jwt,
            },
        });

        const data = await response.json();

        return {
            data,
        };
    },

    create: async () => {
        throw new Error("Not implemented");
    },
    update: async () => {
        throw new Error("Not implemented");
    },
    deleteOne: async () => {
        throw new Error("Not implemented");
    },
    getList: async ({resource}) => {
        const response = await fetch(`${url}/${resource}`, {
            headers: {
                "Authorization": "Bearer " + jwt,
            },
        });
        const data = await response.json();

        return {
            data,
            total: data.length,
        };
    },
    getApiUrl: () => url,
});