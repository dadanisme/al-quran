import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const neuralspaceApi = createApi({
  reducerPath: "neuralspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://voice.neuralspace.ai/api/v1",
    headers: {
      Authorization:
        "sk_bf38daae3695cbb8ed2c320b2cb275178c6ecbfc4c8b3f6cff1584bba4164d73",
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
