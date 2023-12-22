export const getPages = (paging: any) => {
  let pages: number;

  if (paging.total <= paging.limit) {
    pages = 1;
  } else {
    pages = Math.ceil(paging.total / paging.limit);
  }

  return pages;
};
