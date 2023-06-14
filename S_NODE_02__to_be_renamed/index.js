const STORE_API = "https://api.escuelajs.co/api/v1/products";

async function getProducts() {
  return fetch(STORE_API).then((res) => res.json());
}
