import React from "react";

import { AxiosRequestConfig } from "axios";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "react-query";

import api from "../lib/api";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey, pageParam }) => {
        const [key, config] = queryKey as [string, AxiosRequestConfig];

        return api.v2
          .get(`/${key}`, {
            ...config,
            params: {
              ...config?.params,
              page: pageParam,
            },
          })
          .then(({ data }) => data);
      },
    },
  },
});

const QueryClientProvider: React.FC = ({ children }) => {
  return (
    <ReactQueryClientProvider client={client}>
      {children}
    </ReactQueryClientProvider>
  );
};

export { QueryClientProvider };
