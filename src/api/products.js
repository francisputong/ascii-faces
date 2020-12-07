import client from "./client";

const limit = 20;

export const getProducts = async (sort, pageNumber, orderBy) =>
  await client.get(
    `?_sort=${sort}&_order=${orderBy}&_page=${pageNumber}&_limit=${limit}`
  );
