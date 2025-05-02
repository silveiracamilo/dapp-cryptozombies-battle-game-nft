import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetProofAddressResponse, IGetProofRootResponse } from "./types";

export const cryptozombiesBattleApi = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_API_BASE_URL}/`
    }),
    reducerPath: "cryptozombiesBattleApi",
    endpoints: (build) => ({
        getProofRoot: build.query<IGetProofRootResponse, void>({
          query: () => 'proof/root',
        }),
        getProofAddress: build.query<IGetProofAddressResponse, string>({
          query: address => ({ url: `proof/${address}` }),
        }),
    })
});

export const { 
  useGetProofRootQuery,
  useGetProofAddressQuery
} = cryptozombiesBattleApi;