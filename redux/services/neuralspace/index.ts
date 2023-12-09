import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const neuralspaceApi = createApi({
  reducerPath: "neuralspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://voice.neuralspace.ai/api/v1",
    headers: {
      Authorization:
        "sk_8a930c9bd9b37faac8230df45b459d82cc6536f30eca986f4448feea2ffbcb60",
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
