import { connectToDatabase } from "lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
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

    const { id } = req.query;
    if (!id)
      return res.status(400).json({ status: "error", message: "Missing id" });

    const { db } = await connectToDatabase();
    const posts = await db.collection("posts");

    const post = await posts.findOne({});
    if (user.username !== post.account.user)
      return res
        .status(401)
        .json({ status: "error", message: "Not Authorized!" });

    let result = await posts.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount == 0)
      return res
        .status(400)
        .json({ status: "error", message: "Post not found" });
    if (result.deletedCount > 1)
      return res
        .status(400)
        .json({ status: "error", message: "Multiple posts found" });

    return res.status(200).json({ status: "success", message: "Post deleted" });
  }
}
