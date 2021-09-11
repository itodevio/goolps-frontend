import type { AppProps /*, AppContext */ } from "next/app";
import { Grommet, grommet as grommetTheme } from "grommet";
import Navbar from "../components/Navbar";
import "styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grommet theme={grommetTheme}>
      <Toaster />
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <div className="appContainer">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </Grommet>
  );
}

export default MyApp;
