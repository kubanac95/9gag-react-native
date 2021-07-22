import React from "react";
import { useQuery } from "react-query";
import { api } from "../lib/api";

const AppStateContext = React.createContext<
  { isInitialized: boolean } | undefined
>(undefined);

const { Provider } = AppStateContext;

type TokenResponse = {
  data: {
    algoliaToken: string;
    secondsTillExpiry: number;
    tokenExpiry: number;
    userToken: string;
  };
  meta: {
    sid: string;
    status: string;
    timestamp: number;
  };
};

const AppStateProvider: React.FC = ({ children }) => {
  const { isLoading, data } = useQuery<TokenResponse>(["guest-token"], {
    onSuccess: (response) => {
      api.v2.defaults.headers["9GAG-9GAG_TOKEN"] = response?.data?.userToken;
    },
  });

  return (
    <Provider value={{ isInitialized: !!data }}>
      {isLoading ? null : children}
    </Provider>
  );
};

export { AppStateProvider };
