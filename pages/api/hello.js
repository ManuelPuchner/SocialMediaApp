import { connectToDatabase } from "lib/mongodb";

const handler = async (req, res) => {
  let { db } = await connectToDatabase();
  let users = await db.collection("users").find({}).toArray();
  res.status(200).json(users);
};
export default handler;
