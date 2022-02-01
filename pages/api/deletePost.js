import prisma from "lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    const { token } = req.cookies;
    let user;
    if (token) {
      user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }

    let { id } = req.query;
    if (!id)
      return res.status(400).json({ status: "error", message: "Missing id" });

    id = Number(id);

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    const dbUser = await prisma.user.findUnique({
      where: {
        name: user.user.name,
      },
    });

    if (user.user.name !== post.authorName)
      return res
        .status(401)
        .json({ status: "error", message: "Not Authorized!" });

    let result = await prisma.post.delete({
      where: {
        id,
      },
    });

    // remove post from user's posts
    await prisma.user.update({
      where: {
        name: user.user.name,
      },
      data: {
        postIds: {
          set: dbUser.postIds.filter((id) => id !== post.id),
        },
      },
    });

    if (result) {
      return res
        .status(200)
        .json({ status: "success", message: "Post deleted" });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Post not found" });
    }
  }
}
