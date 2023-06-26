const getId = (() => {
  id = 1;
  return () => id++;
})();
function normalizer(item) {
  // console.log("item to be normalized :", item);
  item.id = item.id || getId();
  item.creationAt = item.creationAt || new Date().toISOString();
  item.updatedAt = new Date().toISOString();
  // console.log("item  normalized :", item);
}
module.exports = normalizer;
