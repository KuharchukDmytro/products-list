/* eslint-disable import/no-anonymous-default-export */
import { Product } from "../types/Product";

function request<T>(url: string, method: string, body?: any): Promise<T> {
  const fullUrl = 'http://localhost:3000' + url;

  return fetch(fullUrl, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export default {
  getAll: () => request<Product[]>('/products', 'GET'),
  getById: (productId: number) => request<Product>(`/products/${productId}`, 'GET'),
  create: (product: Product) => request<Product>('/products', 'POST', product),
  remove: (productId: number) => request<Product>(`/products/${productId}`, 'DELETE'),
};
