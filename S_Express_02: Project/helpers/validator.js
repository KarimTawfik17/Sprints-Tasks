const Joi = require("joi");
const { getCategory } = require("../model/model.js");
const newProductSchema = Joi.object({
  title: Joi.string().min(1).required(),
  price: Joi.number().integer().min(1).required(),
  description: Joi.string().min(1).required(),
  categoryId: Joi.number().integer().min(1).required(),
  images: Joi.array().allow(Joi.string()).min(1).required(),
});
const updateProductSchema = Joi.object({
  title: Joi.string().min(1),
  price: Joi.number().integer().min(1),
  description: Joi.string().min(1),
  categoryId: Joi.number().integer().min(1),
  images: Joi.array().allow(Joi.string()).min(1),
});
const newCategorySchema = Joi.object({
  name: Joi.string().min(1).required(),
  image: Joi.string().min(1).required(),
});
const updateCategorySchema = Joi.object({
  name: Joi.string().min(1),
  image: Joi.string().min(1),
});

function newProductValidator(req, res, next) {
  const product = req.body;
  const { value, error } = newProductSchema.validate(product);
  if (error) {
    res.status(400).send(error.message);
  } else {
    next();
  }
}
function categoryExistValidator(req, res, next) {
  const { categoryId } = req.body;
  if (!categoryId) {
    return next(); // no categoryId then this request is update or it will be failed already
  }
  if (!getCategory(categoryId)) {
    res
      .status(400)
      .send(`Ther's no category with the id: ${categoryId}, create one first`);
  } else {
    next();
  }
}
function updateProductValidator(req, res, next) {
  const product = req.body;
  const { value, error } = updateProductSchema.validate(product);
  if (error) {
    res.status(400).send(error.message);
  } else {
    next();
  }
}
function newCategoryValidator(req, res, next) {
  const category = req.body;
  const { value, error } = newCategorySchema.validate(category);
  if (error) {
    res.status(400).send(error.message);
  } else {
    next();
  }
}
function updateCategoryValidator(req, res, next) {
  const category = req.body;
  const { value, error } = updateCategorySchema.validate(category);
  if (error) {
    res.status(400).send(error.message);
  } else {
    next();
  }
}

module.exports = {
  newProductValidator,
  updateProductValidator,
  newCategoryValidator,
  updateCategoryValidator,
  categoryExistValidator,
};
