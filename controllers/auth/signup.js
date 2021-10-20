const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const avatar = gravatar.url(
    email,
    {
      s: "250",
      d: "retro",
    },
    true
  );

  const newUser = new User({ email });

  newUser.setPassword(password);
  newUser.setAvatar(avatar);

  await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Success created",
  });
};

module.exports = signup;
