import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { FormInput, FormSubmit } from "components/Layout/FormComponents";
const User = (props) => {
  const [quote, setQuote] = useState("");
  const [newQuote, setNewQuote] = useState("");
  async function sendNewQuote(e) {
    e.preventDefault();
    const promise = await fetch("/api/setQuote", {
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
        <div className="user">
          <h3 className="username">
            Username: {props.user_information.username}
          </h3>
          <p>Quote: {quote}</p>
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
      ) : (
        <>{props.error}</>
      )}
    </div>
  );
};

import { connectToDatabase } from "lib/mongodb";

export async function getServerSideProps(ctx) {
  let cookieToken;
  try {
    cookieToken = ctx.req.headers.cookie.replace("token=", "").split(";")[0];
  } catch {}

  let req_user = ctx.query.user;
  const { db } = await connectToDatabase();
  let user = await db.collection("users").findOne({ username: req_user });

  if (user) {
    let isOwner =
      user.username ===
      jwt.verify(cookieToken, process.env.JWT_SECRET_KEY).username;
    return {
      props: {
        status: "ok",
        user_information: {
          username: user.username,
          isOwner: isOwner,
        },
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
