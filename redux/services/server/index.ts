import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://speech-server.vercel.app",
  }),
  endpoints: (builder) => ({
    createJob: builder.mutation<CreateJobResponse, string>({
      query: (text) => ({
        url: "/",
        method: "POST",
        body: { data: text },
      }),
    }),
  }),
});

export const { useCreateJobMutation } = serverApi;
export default serverApi;
