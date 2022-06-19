import SnackbarProvider from "react-simple-snackbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default MyApp;
