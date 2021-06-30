import nc from "next-connect";
import User from "../../models/User";
import { connectDB } from "../../util/connectDB";
import Cookies from "cookies";

const handler = nc();

handler.post(async (req, res) => {
  const cookies = new Cookies(req, res);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "Email does not exist." });
    }
    if (user) {
      // TODO create script here to send forgot password email
      sendForgotPasswordEmail(req.body.email);
      // TODO create script here to add a listener for a visit a link and redirect in the get method here and listen for uuid in params
      createListener();
    }
    return res.json(req.body);
  } catch (error) {
    return res.json(error);
  }
});

export default connectDB(handler);
