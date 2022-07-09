import SnackbarProvider from "react-simple-snackbar";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store, wrapper } from "../src/redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
