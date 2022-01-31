import prisma from "lib/prisma";

const handler = async (req, res) => {
  let dbUser = await prisma.user.findUnique({
    where: {
      name: "Manuel2",
    },
  });
  if (!dbUser) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
      code: "user_not_found",
    });
  }
  res.status(200).json(dbUser);
};
export default handler;
