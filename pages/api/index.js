import nc from "next-connect";
import { middleware, connectDB } from "../../util/connectDB";
import User from "../../models/User";

const handler = nc();
// handler.use(middleware);
handler.post(async (req, res) => {
  res.json({ msg: "Reached portal index route" });
});
handler.get(async (req, res) => {
  try {
    let user = await User.find({});
    let arr = [];
    for (var i = 0; i < user.length; i++) {
      let x = user[i]._doc;
      x = { ...x, password: null };
      arr.push(x);
    }
    return res.json({
      user: arr,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

export default connectDB(handler);
