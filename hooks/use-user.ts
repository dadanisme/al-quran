import { onAuthStateChanged, User } from "firebase/auth";
import React from "react";
import { auth } from "services/firebase";

export default function useUser() {
  const [state, setState] = React.useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState({ user, error: null, isLoading: false });
      } else {
        setState({ user: null, error: "Not logged in", isLoading: false });
      }
    });

    return () => unsubscribe();
  }, []);

  return state;
}
