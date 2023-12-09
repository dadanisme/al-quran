import { configureStore } from "@reduxjs/toolkit";
import quranApi from "./services/e-quran";
import searchApi from "./services/typesense";
import quranCloudApi from "./services/al-quran-cloud";
import qcriApi from "./services/qcri";
import neuralspaceApi from "./services/neuralspace";

export const store = configureStore({
  reducer: {
    [quranApi.reducerPath]: quranApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [quranCloudApi.reducerPath]: quranCloudApi.reducer,
    [qcriApi.reducerPath]: qcriApi.reducer,
    [neuralspaceApi.reducerPath]: neuralspaceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      quranApi.middleware,
      searchApi.middleware,
      quranCloudApi.middleware,
      qcriApi.middleware,
      neuralspaceApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
