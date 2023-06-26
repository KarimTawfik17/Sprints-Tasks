const getId = (() => {
  id = 1;
  return () => id++;
})();
function normalizer(product) {
  console.log("product to be normalized :", product);
  product.id = product.id || getId();
  product.creationAt = product.creationAt || new Date().toISOString();
  product.updatedAt = new Date().toISOString();
  console.log("product  normalized :", product);
}
module.exports = normalizer;
