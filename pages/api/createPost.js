import jwt from "jsonwebtoken";
import { connectToDatabase } from "lib/mongodb";
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

    let { db } = await connectToDatabase();
    let posts = await db.collection("posts");
    let dbUser = await db
      .collection("users")
      .findOne({ username: user.username });
    if (!dbUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        code: "user_not_found"
      });
    }
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        status: "error",
        message: "Title and content are required",
        code: "title_or_content_missing"
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

    let post = await posts.insertOne({
      createdAt: new Date(),
      account: {
        username: dbUser.username,
      },
      type: req.body.type,
      title: req.body.title,
      content: content
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
