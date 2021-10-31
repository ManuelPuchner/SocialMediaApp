import Layout from "components/Layout/Layout";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";

export const LoggedInContext = createContext();

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
