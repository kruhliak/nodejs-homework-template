const { NotFound } = require("http-errors");

const { User } = require("../../models");

const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });
  if (!user) {
    throw new NotFound("Verify error");
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = verify;
