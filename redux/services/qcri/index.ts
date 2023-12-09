import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const qcriApi = createApi({
  reducerPath: "qcriApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://transliterate.qcri.org",
  }),
  endpoints: (builder) => ({
    transliteration: builder.mutation<TransliterationResult, string>({
      query: (text) => `/ar2en/nbest/${text}`,
    }),
  }),
});

export const { useTransliterationMutation } = qcriApi;
export default qcriApi;
