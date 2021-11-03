import Link from "next/link";
import { LoggedInContext } from "contextStores";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

import CreatePostSection from "./CreatePostSection";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [showCreateNewPostSection, setShowCreateNewPostSection] =
    useState(false);
  function logout() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setShowCreateNewPostSection(false);
    router.push("/");
  }
  function toggleCreateNewPost() {
    setShowCreateNewPostSection(!showCreateNewPostSection);
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
          <Link href="/">
            <a className="mx-1.5">Home</a>
          </Link>
          {!isLoggedIn && (
            <>
              <Link href="/login">
                <a className="mx-1.5">Login</a>
              </Link>
              <Link href="/signup">
                <a className="mx-1.5">SignUp</a>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <button onClick={toggleCreateNewPost}>
                <span className="border-2 border-black h-5 w-5 block leading-3">
                  +
                </span>
              </button>
              <button onClick={logout} className="mx-1.5">
                Logout
              </button>
              <Link href={`/${jwt.decode(Cookies.get("token")).username}`}>
                <a className="mx-1.5">My Profile</a>
              </Link>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer>footer</footer>
      {/* static stuff */}
      <CreatePostSection show={showCreateNewPostSection} />
    </div>
  );
};

export default Layout;
