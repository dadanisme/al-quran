import { StatusBar } from "expo-status-bar";
import Screens from "./screens";
import { Provider } from "react-redux";
import { store } from "redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Screens />
    </Provider>
  );
}
