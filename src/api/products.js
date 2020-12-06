import client from "./client";

export const getProducts = async (sort, pageNumber) =>
  await client.get(`?_sort=${sort}&_page=${pageNumber}&_limit=20`);
