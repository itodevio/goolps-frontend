import React from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import Navbar from "../components/Navbar";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="appContainer">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
