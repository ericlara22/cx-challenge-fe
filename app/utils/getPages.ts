export const getPages = (elementsPerPage: number, totalElements: number) => {
  let pages: number;

  if (totalElements % elementsPerPage === 0) {
    pages = totalElements / elementsPerPage;
  } else {
    pages = Math.floor(totalElements / elementsPerPage) + 1;
  }

  return pages;
};
