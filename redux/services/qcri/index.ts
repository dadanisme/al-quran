import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const qcriApi = createApi({
  reducerPath: "qcriApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://transliterate.qcri.org",
  }),
  endpoints: (builder) => ({
    transliteration: builder.query<TransliterationResult, string>({
      query: (text) => `/ar2en/nbest/${text}`,
      transformResponse: (response: { results: Record<string, string> }) => {
        return { results: Object.values(response.results) };
      },
    }),
  }),
});

export const { useTransliterationQuery } = qcriApi;
export default qcriApi;
