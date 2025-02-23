"use client";

import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string): DataProvider => ({
  getOne: async ({ id, resource }) => {
    const response = await fetch(`${url}/${resource}/${id}`, {
        headers: {
                "X-API-KEY": "b05a38f2-6235-4cd8-b756-e0d851769975",
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
                "X-API-KEY": "b05a38f2-6235-4cd8-b756-e0d851769975",
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