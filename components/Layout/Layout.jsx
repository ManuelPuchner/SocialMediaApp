import Link from "next/link";
import { LoggedInContext } from "pages/_app";
import { useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  function logout() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/");
  }
  return (
    <div
      className="
        grid
        grid-rows-layout
        layout min-h-screen
        p-4
        bg-gradient-to-br
      from-green-400
      to-blue-500
      "
    >
      <header className="flex justify-between">
        <div className="branding">Social Media App</div>
        <nav className="flex">
          {!isLoggedIn && (
            <>
              <Link href="/login">
                <a className="mx-1">Login</a>
              </Link>
              <Link href="/signup">
                <a className="mx-1">SignUp</a>
              </Link>
            </>
          )}
          {isLoggedIn && <button onClick={logout}>Logout</button>}
          <Link href="/">
            <a className="mx-1">Home</a>
          </Link>
          {isLoggedIn && (
            <Link href={`/${jwt.decode(Cookies.get("token")).username}`}>
              <a>My Profile</a>
            </Link>
          )}
        </nav>
      </header>

      <main>{children}</main>

      <footer>footer</footer>
    </div>
  );
};

export default Layout;
