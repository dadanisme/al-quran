type NeuralSpaceResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type NeuralSpaceJob = {
  timestamp: number;
  filename: string;
  jobId: string;
  params: {
    file_transcription: {
      mode: string;
      language_id: string;
    };
    sentiment_detect: boolean;
  };
  status: string;
  audioDuration: number;
  messsage: string;
  progress: string[];
  result: {
    transcription: {
      transcript: string;
      enhanced_transcript: null;
      timestamps: {
        word: string;
        start: number;
        end: number;
        conf: number;
      }[];
    };
  };
};

type NeuralSpaceJobResponse = NeuralSpaceResponse<NeuralSpaceJob>;

type CreateJobResponse = NeuralSpaceResponse<{ jobId: string }>;

const data: NeuralSpaceJobResponse = {
  success: true,
  message: "Data fetched successfully",
  data: {
    timestamp: 1702124095449,
    filename: "WhatsApp Ptt 2023-12-09 at 19.14.36.ogg",
    jobId: "aeeafcf3-71a0-4096-bd88-af846f827727",
    params: {
      file_transcription: {
        mode: "advanced",
        language_id: "ar",
      },
      sentiment_detect: false,
    },
    status: "Completed",
    audioDuration: 3.58,
    messsage: "",
    progress: [
      "Queued",
      "Started",
      "Transcription Started",
      "Transcription Completed",
      "Completed",
    ],
    result: {
      transcription: {
        transcript: "الحمد لله رب العالمين",
        enhanced_transcript: null,
        timestamps: [
          {
            word: "الحمد",
            start: 0.41,
            end: 1.23,
            conf: 0.86,
          },
          {
            word: "لله",
            start: 1.23,
            end: 1.85,
            conf: 0.99,
          },
          {
            word: "رب",
            start: 1.85,
            end: 2.35,
            conf: 0.99,
          },
          {
            word: "العالمين",
            start: 2.35,
            end: 3.43,
            conf: 1,
          },
        ],
      },
    },
  },
};
