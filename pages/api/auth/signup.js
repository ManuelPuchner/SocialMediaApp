import { connectToDatabase } from "lib/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    let { db } = await connectToDatabase();
    let users = await db.collection("users");

    const hashedPassword = await bcrypt.hash(password, 12);

    const exists = await users.findOne({ username: username });

    if (exists) {
      return res
        .status(500)
        .json({ status: "error", error: "User already exists" });
    }
    const result = await users.insertOne({
      username: username,
      password: hashedPassword,
    });
    if (result.acknowledged) {
      res.status(200).json({ status: "ok", message: "User Created" });
    }
  }
}
