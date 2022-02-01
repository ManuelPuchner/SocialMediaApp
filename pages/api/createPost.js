import jwt from "jsonwebtoken";
import prisma from "lib/prisma";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    let dbUser = await prisma.user.findUnique({
      where: {
        name: user.user.name,
      },
    });

    if (!dbUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        code: "user_not_found",
      });
    }
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        status: "error",
        message: "Title and content are required",
        code: "title_or_content_missing",
      });
    }
    if (req.body.title.length > 100 || req.body.content.length > 1000) {
      return res.status(400).json({
        status: "error",
        message: "Title and content must be less than 100 and 1000 characters",
        code: "title_or_content_too_long",
      });
    }

    // strip away unwanted characters
    let content = req.body.content
      .replace(/<script>/g, "")
      .replace(/<\/script>/g, "")
      .replace(/[\n\r]{2,}/g, "\n");

    let post = await prisma.post.create({
      data: {
        author: {
          connect: {
            name: dbUser.name,
          },
        },
        type: req.body.type,
        title: req.body.title,
        content,
      },
    });

    if (!post) {
      return res.status(500).json({
        status: "error",
        message: "Post not created",
      });
    }
    res.json({ status: "ok", message: "Post created" });
  }
}
