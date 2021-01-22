import React from "react";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
  setLogger,
} from "react-query";

setLogger({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

const client = new QueryClient();

const QueryClientProvider: React.FC = ({ children }) => {
  return (
    <ReactQueryClientProvider client={client}>
      {children}
    </ReactQueryClientProvider>
  );
};

export { QueryClientProvider };
