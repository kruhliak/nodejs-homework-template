const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(1).required(),
  phone: Joi.string().min(1).required(),
});

const updateFavoriteJoiSchema = Joi.object({
  active: Joi.boolean().required(),
});

const Contact = model("product", contactSchema);

module.exports = {
  joiSchema,
  updateFavoriteJoiSchema,
  Contact,
};
