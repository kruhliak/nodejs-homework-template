const { User } = require("../../models");

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findOne(
    { _id },
    "_id email subscription avatarURL"
  );
  console.log(result);
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = currentUser;
