import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const quranApi = createApi({
  reducerPath: "quranApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://equran.id/api",
  }),
  endpoints: (builder) => ({
    allSurah: builder.query<Surah[], void>({
      query: () => "/surat",
    }),
    surah: builder.query<SurahData, number>({
      query: (id) => `/surat/${id}`,
    }),
    tafsir: builder.query<TafsirData, number>({
      query: (id) => `/tafsir/${id}`,
    }),
    localSurah: builder.query<SurahData[], void>({
      queryFn(arg, api, extraOptions, baseQuery) {
        const data = require("dataset/suratWithTafsir.json");

        return { data };
      },
    }),
  }),
});

export const {
  useAllSurahQuery,
  useSurahQuery,
  useTafsirQuery,
  useLocalSurahQuery,
} = quranApi;
export default quranApi;
