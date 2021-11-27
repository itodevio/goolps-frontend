import type { AppProps /*, AppContext */ } from "next/app";
import { Grommet, grommet as grommetTheme } from "grommet";
import Navbar from "../components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import "styles/globals.css";
import app from "connection/firebase.connection";
import { LoadingOutlined } from "@ant-design/icons";
import AppContextProvider, { AppContext } from "context/app.context";
import { useRouter } from "next/router";
import AppWrapper from "AppWrapper";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Grommet theme={grommetTheme}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <AppWrapper Component={Component} pageProps={pageProps} />
        </QueryClientProvider>
      </Grommet>
    </AppContextProvider>
  );
}

export default MyApp;
