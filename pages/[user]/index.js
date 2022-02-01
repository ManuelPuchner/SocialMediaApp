/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { FormInput, FormSubmit } from "components/FormComponents";
import PostCard from "components/PostCard";
const User = (props) => {
  const [quote, setQuote] = useState("");
  const [newQuote, setNewQuote] = useState("");
  const router = useRouter();
  async function sendNewQuote(e) {
    e.preventDefault();
    const promise = await fetch(`${router.basePath}/api/setQuote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: newQuote,
      }),
    });
    const result = await promise.json();
    console.log(result);
    if (result.status === "ok") {
      setQuote(newQuote);
      setNewQuote("");
    }
  }
  return (
    <div>
      {props.status == "ok" ? (
        <div>
          <div
            className="
            user-information-wrapper
            mx-10
            mt-10
            flex
          "
          >
            <div className="user-avatar-wrapper w-1/5 h-full">
              <img
                src={`https://eu.ui-avatars.com/api/?name=${props.user_information.username}`}
                alt=""
                className="
                user-avatar
                rounded-2xl
                w-full
              "
              />
            </div>
            <div
              className="
              user-information
              ml-6
              py-2
            "
            >
              <h3
                className="
                username
                text-xl
                font-medium
                leading-4
                m-0
              "
              >
                {props.user_information.username}
              </h3>
              <p>
                Quote:{" '"}
                <span className="italic">
                  {quote
                    ? quote
                    : props.user_information.quote
                    ? props.user_information.quote
                    : "No Quote Found"}
                </span>
                {"'"}
              </p>
              {props.user_information.isOwner && (
                <div className="owner-specific">
                  <form onSubmit={sendNewQuote}>
                    <FormInput
                      placeholder="new cool quote"
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                    />
                    <FormSubmit
                      value="Submit new quote"
                      className="
                    ml-2
                    bg-transparent 
                    rounded-sm 
                    ring-black 
                    ring-2
                    px-2
                    py-1.5
                    transition
                    transform
                    focus:outline-none
                    focus:shadow-lg
                    focus:-translate-y-0.5
                    mb-3
                  "
                      readOnly
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
          {props.posts && (
            <div className="user-posts">
              {props.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>{props.error}</>
      )}
    </div>
  );
};

import prisma from "lib/prisma";

export async function getServerSideProps(ctx) {
  let cookieToken;
  try {
    cookieToken = ctx.req.cookies.token;
  } catch {}

  let req_user = ctx.query.user;

  let user = await prisma.user.findUnique({
    where: {
      name: req_user,
    },
  });

  if (user) {
    let isOwner = false;
    if (cookieToken) {
      isOwner =
        user.name ===
        jwt.verify(cookieToken, process.env.JWT_SECRET_KEY).user.name;
    }

    let userPosts = await prisma.post.findMany({
      where: {
        authorName: user.name,
      },
    });
    return {
      props: {
        status: "ok",
        user_information: {
          username: user.name,
          quote: user.bio || null,
          isOwner: isOwner,
        },
        posts: JSON.parse(JSON.stringify(userPosts)),
      },
    };
  }

  return {
    props: {
      status: "error",
      error: `User "${req_user}" not found`,
    },
  };
}

export default User;
