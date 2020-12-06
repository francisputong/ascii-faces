import client from "./client";

export const getProducts = async (filter, pageNumber) =>
  await client.get(`?_sort=${filter}&_page=${pageNumber}&_limit=20`);
