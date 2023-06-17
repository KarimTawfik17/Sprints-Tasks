require("dotenv").config();
const STORE_API = "https://api.escuelajs.co/api/v1/products";
const API_KEY = process.env.API_KEY;
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

async function getRate(currency) {
  const api = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&currencies=${currency}`;
  const rate = await fetch(api)
    .then((Response) => Response.json())
    .then((json) => +json.data[currency].value);
  return rate;
}
// getRate("EUR").then(console.log);
async function transformProductsPrice(categories, currency = "EGP") {
  const rate = await getRate(currency);
  return categories.map((category) => ({
    ...category,
    products: category.products.map((product) => ({
      ...product,
      price: (product.price * rate).toFixed(2),
    })),
  }));
}

async function addProduct(product) {
  const api = "https://api.escuelajs.co/api/v1/products/";
  return fetch(api, {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

// getProducts()
//   .then(categorize)
//   .then(transformProductsPrice)
//   .then((data) => console.log(JSON.stringify(data, null, 2)));

module.exports = {
  getProducts,
  categorize,
  transformProductsPrice,
  getRate,
  addProduct,
};
