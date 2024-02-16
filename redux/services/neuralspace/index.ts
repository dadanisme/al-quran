import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const neuralspaceApi = createApi({
  reducerPath: "neuralspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://voice.neuralspace.ai/api/v1",
    headers: {
      Authorization:
        "sk_d49d72f99db80b3de8358cb40d30b7b83fbfad320d3515d15f69069a2ee58053",
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
