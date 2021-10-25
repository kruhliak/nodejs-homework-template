const express = require("express");

const { joiSchema } = require("../../models/user");
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middleware");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.currentUser));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.uploadAvatars)
);

router.get("/verify/:verifyToken", controllerWrapper(ctrl.verify));
module.exports = router;
