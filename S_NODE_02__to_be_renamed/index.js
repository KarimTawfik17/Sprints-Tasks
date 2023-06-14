const STORE_API = "https://api.escuelajs.co/api/v1/products";

async function getProducts() {
  return fetch(STORE_API).then((res) => res.json());
}

function categorize(products) {
  return Object.values(
    products.reduce((categories, product) => {
      if (!categories[product.category.id]) {
        categories[product.category.id] = {
          category: { id: product.category.id, name: product.category.name },
          products: [],
        };
      }
      categories[product.category.id].products.push(product);
      return categories;
    }, {})
  );
}
getProducts().then(categorize).then(console.log);
