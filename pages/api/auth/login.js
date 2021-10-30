import { connectToDatabase } from "lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { username, password } = req.body;

    let { db } = await connectToDatabase();
    const users = await db.collection("users");
    let user = await users.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ status: "error", error: "No user found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(500).json({ status: "error", error: "Wrong password" });
    }

    const token = jwt.sign({ username: username }, process.env.JWT_SECRET_KEY);

    console.log(token);
    res.status(200).json({ status: "ok", token: token });
  }
}
