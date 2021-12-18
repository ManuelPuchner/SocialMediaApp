import { useState, useContext } from "react";
import { LoggedInContext } from "contextStores";
import Link from "next/link";
import { connectToDatabase } from "lib/mongodb";
import PostCard from "components/PostCard";

export default function Home({ data }) {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  return (
    <div>
      {isLoggedIn ? (
        <LoggedInComponent data={data} />
      ) : (
        <NotLoggedInComponent />
      )}
    </div>
  );
}

function LoggedInComponent({ data }) {
  return (
    <div>
      {data && (
        <div className="">
          {data.posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
import jwt from "jsonwebtoken";
export const getServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  let user;
  if (token) {
    user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  }

  let { db } = await connectToDatabase();
  let posts = await db
    .collection("posts")
    .find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .toArray();

  posts = JSON.parse(JSON.stringify(posts));
  if (!user) {
    return {
      props: {
        status: 401,
        message: "Unauthorized",
      },
    };
  }
  return {
    props: {
      data: {
        posts,
      },
    },
  };
};

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
