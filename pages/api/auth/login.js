import prisma from "lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { username, password } = req.body;
 
    let user = await prisma.user.findUnique({
      where: {
        name: username,
      },
    });

    if (!user) {
      return res.status(404).json({ status: "error", error: "No user found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(500).json({ status: "error", error: "Wrong password" });
    }

    const token = jwt.sign(
      {
        user: {
          id: user.id,
          name: user.name,
        },
      },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).json({ status: "ok", token: token });
  }
}
