import nc from "next-connect";

const errorHandler = async (handler) => {
  handler.options.onError = () => {
    return res.status(500).json({ success: false, msg: "Awww shucky ducky" });
  };
};

export default errorHandler;
