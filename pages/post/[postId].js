import PostCard from "components/PostCard";

export default function Post(data) {
  return <div>
    {data.status === "ok" ? (
      <PostCard post={data.post} />
    ): (
      <>{data.message}</>
    )}
  </div>;
}

import prisma from "lib/prisma";
export async function getServerSideProps(ctx) {
  let cookieToken;
  try {
    cookieToken = ctx.req.cookies.token;
  } catch {}

  let postId = ctx.query.postId;

  let post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });

  if (post) {
    return {
      props: {
        status: "ok",
        post: JSON.parse(JSON.stringify(post)),
      },
    };
  }
  return {
    props: {
      status: "error",
      message: "Post not found",
    },
  };
}
