const User = (props) => {
  return (
    <div>
      {props.status == "ok" ? (
        <>{props.user_information.username}</>
      ) : (
        <>{props.error}</>
      )}
    </div>
  );
};

import { connectToDatabase } from "lib/mongodb";

export async function getServerSideProps(ctx) {
  let req_user = ctx.query.user;
  const { db } = await connectToDatabase();
  let user = await db.collection("users").findOne({ username: req_user });
  if (user) {
    return {
      props: {
        status: "ok",
        user_information: {
          username: user.username,
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
