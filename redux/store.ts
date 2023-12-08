import { configureStore } from "@reduxjs/toolkit";
import quranApi from "./services/e-quran";
import searchApi from "./services/typesense";

export const store = configureStore({
  reducer: {
    [quranApi.reducerPath]: quranApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(quranApi.middleware, searchApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
