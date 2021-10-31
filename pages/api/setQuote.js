import { connectToDatabase } from "lib/mongodb";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method === "POST") {
    let verified = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    if (verified) {
      let { db } = await connectToDatabase();

      let updated = await db
        .collection("users")
        .updateOne(
          { username: verified.username },
          { $set: { quote: req.body.quote } }
        );
      res.status(200).json({ status: "ok", message: "Quote updated" });
    } else {
      res.status(500).json({ status: "error", error: "Not logged in" });
    }
  }
};
export default handler;
