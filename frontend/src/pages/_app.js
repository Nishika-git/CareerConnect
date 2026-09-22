import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/config/redux/store";

export default function App({ Component, pageProps }) {
  return<>
  <Provider store = {store}>

  <Component {...pageProps} />
  </Provider>
  <script src="//code.tidio.co/wd288mi9e4oxinp2nnnm7uiqd27vtmmp.js" async></script>
  </> 
}
