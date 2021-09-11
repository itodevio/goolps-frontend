import type { AppProps /*, AppContext */ } from "next/app";
import { Grommet, grommet as grommetTheme } from 'grommet'
import Navbar from "../components/Navbar";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grommet theme={grommetTheme}>
      <Navbar />
      <div className="appContainer">
        <Component {...pageProps} />
      </div>
    </Grommet>
  );
}

export default MyApp;
