import Navbar from "components/Navbar";
import app from "connection/firebase.connection";
import { AppContext } from "context/app.context";
import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

interface AppWrapperProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ Component, pageProps }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { isEntering } = useContext(AppContext);

  useEffect(() => {
    app.auth().onAuthStateChanged(function (user) {
      setIsLoading(true);
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
        router.push("/login");
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isAuth && !isEntering && <Navbar />}
      <div className="appContainer">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default AppWrapper;
