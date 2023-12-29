import client from "utils/typesense";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SearchParams,
  SearchResponse,
} from "typesense/lib/Typesense/Documents";

const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    search: builder.query<SearchResponse<TypesenseAyat>, SearchParams>({
      async queryFn(arg, api, extraOptions, baseQuery) {
        const result = (await client
          .collections<TypesenseAyat>("ayat")
          .documents()
          .search(arg, {
            // cacheSearchResultsForSeconds: 60 * 60 * 6, // 6 hours
          })) as SearchResponse<TypesenseAyat>;

        return { data: result };
      },
    }),
  }),
});

export const { useSearchQuery } = searchApi;
export default searchApi;
