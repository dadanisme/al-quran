import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const neuralspaceApi = createApi({
  reducerPath: "neuralspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://voice.neuralspace.ai/api/v1",
  }),
  endpoints: (builder) => ({
    job: builder.query<NeuralSpaceJobResponse, string>({
      query: (jobId) => `/jobs/${jobId}`,
    }),
    createJob: builder.mutation<CreateJobResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("files", file);
        formData.append(
          "config",
          JSON.stringify({
            file_transcription: { mode: "advanced", language_id: "ar" },
            sentiment_detect: false,
          })
        );

        return {
          url: "/jobs",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useJobQuery, useCreateJobMutation } = neuralspaceApi;
export default neuralspaceApi;
