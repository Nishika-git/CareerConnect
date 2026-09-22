import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/config/redux/store";

export default function App({ Component, pageProps }) {
  return<>
  <Provider store = {store}>

  <Component {...pageProps} />
  </Provider>
  <script src="https://cdn.botpress.cloud/webchat/v5.0/inject.js"></script>
<script src="https://files.bpcontent.cloud/2026/09/22/16/20260922160643-6CEGYSE3.js" defer></script>
  </> 
}
