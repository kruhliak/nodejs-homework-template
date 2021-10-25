const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

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

  const verifyToken = nanoid();

  const newUser = new User({ email, verifyToken, avatar });

  newUser.setPassword(password);
  newUser.setAvatar(avatar);

  await newUser.save();

  const data = {
    to: email,
    subject: "Confirm new user sign-up's",
    html: `
        <a href="http://localhost:3000/api/users/verify/${verifyToken}" target="_blank">Confirm your email</a>`,
  };

  await sendEmail(data);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Success created",
  });
};

module.exports = signup;
