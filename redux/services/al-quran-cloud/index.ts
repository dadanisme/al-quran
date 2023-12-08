import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const quranCloudApi = createApi({
  reducerPath: "quranCloudApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.alquran.cloud/v1",
  }),
  endpoints: (builder) => ({
    sound: builder.query<string, number>({
      query: (id) => `/ayah/${id}/ar.alafasy`,
      transformResponse: (response: any) => response.data.audio,
    }),
  }),
});

export const { useSoundQuery } = quranCloudApi;
export default quranCloudApi;
