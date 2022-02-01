import prisma from "lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const users =
      await prisma.user.findMany({
        where: {
          name: username,
        },
      });
    if (users.length > 0) {
      return res
        .status(500)
        .json({ status: "error", error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
      },
    });
    if (user) {
      return res.status(200).json({ status: "ok", message: "User Created" });
    }
    return res
      .status(400)
      .json({ status: "error", error: "User already exists" });
  }
}
