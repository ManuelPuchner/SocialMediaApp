import Layout from "components/Layout/Layout";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Cookies from "js-cookie";
import {  useState, useEffect } from "react";

import { LoggedInContext } from "contextStores";

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <LoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LoggedInContext.Provider>
  );
}

export default MyApp;
