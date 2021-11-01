import { useState, useContext } from "react";
import { LoggedInContext } from "contextStores";
import Link from "next/link";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

  return (
    <div>{isLoggedIn ? <LoggedInComponent /> : <NotLoggedInComponent />}</div>
  );
}

function LoggedInComponent() {
  return <></>;
}

function NotLoggedInComponent() {
  return (
    <>
      <h2
        className="
          text-center
          mt-16
          text-3xl
          font-semibold
        "
      >
        An awesome social media App
      </h2>
      <div className="wrapper text-center flex">
        <Link href="/signup">
          <a
            className="
              w-1/2
              p-3
              block
              mx-1
              bg-white
              rounded-md
              bg-opacity-60
            "
          >
            Create an account
          </a>
        </Link>
        <Link href="/login">
          <a
            className="
              w-1/2
              p-3
              block
              mx-1
              bg-white
              rounded-md
              bg-opacity-40
            "
          >
            Login with your account
          </a>
        </Link>
      </div>
    </>
  );
}
