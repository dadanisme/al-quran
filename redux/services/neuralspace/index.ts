import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const neuralspaceApi = createApi({
  reducerPath: "neuralspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://voice.neuralspace.ai/api/v1",
    headers: {
      Authorization:
        "sk_c1c2c0d0e3436c7a034c562ac2fbcb3cd43e031486e79cbea74ce09faa8b554a",
    },
  }),
  endpoints: (builder) => ({
    job: builder.query<NeuralSpaceJobResponse, string>({
      query: (jobId) => `/jobs/${jobId}`,
    }),
  }),
});

export const { useJobQuery } = neuralspaceApi;
export default neuralspaceApi;
