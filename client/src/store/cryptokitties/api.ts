import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IKitty } from "../interface/cryptokitties/IKitty";
import axios from "axios";
import { IGetKittiesResponse } from "./types";

export const cryptokittiesApi = createApi({
    baseQuery: fetchBaseQuery(),
    reducerPath: "cryptokittiesApi",
    endpoints: (build) => ({
        getKitties: build.query<IKitty[], void>({
          queryFn: async () => {
            const { data } = await axios.get<IGetKittiesResponse>('https://api.cryptokitties.co/kitties?limit=5');
            return { data: data.kitties };
          },
        }),
    })
});

export const { useGetKittiesQuery } = cryptokittiesApi;