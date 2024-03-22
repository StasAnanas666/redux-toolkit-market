const api_url = "http://localhost:8888/products";

export async function getProducts() {
  const response = await fetch(api_url);
  if (!response.ok) {
    throw new Error("Ошибка при получении данных!");
  }
  return response.json();
}

export async function addProduct(productData) {
  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Ошибка при добавлении товара!");
  }
  return response.json();
}

export async function updateProduct(productData) {
  const response = await fetch(`${api_url}/${productData._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Ошибка при обновлении товара!");
  }
  return response.json();
}

export async function deleteProduct(productId) {
  const response = await fetch(`${api_url}/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Ошибка при удалении товара!");
  }
  return productId;
}
