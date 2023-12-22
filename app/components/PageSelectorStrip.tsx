// components/PageSelectorStrip.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useProductContext } from "@/context/ProductContext";

import { getPages } from "@/utils/getPages";

export default function PageSelectorStrip() {
  const { state, dispatch } = useProductContext();
  const [page, setPage] = useState(1);
  const router = useRouter();

  const total = getPages(10, state.paging.total);

  useEffect(() => {
    const currentPage = router.query.page
      ? parseInt(router.query.page as string, 10)
      : 1;
    const currentSearch = (router.query.search as string) || "";
    setPage(currentPage);
  }, [router.query.page, router.query.search]);

  const handlePrevious = () => {
    const prevPage = Math.max(1, page - 1);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: prevPage },
    });
  };

  const handleNext = () => {
    const productsPerPage = 10; // TODO: Move to context
    const totalPages = Math.ceil(total / productsPerPage);
    const nextPage = Math.min(totalPages, page + 1);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: nextPage },
    });
  };

  return (
    <nav>
      <div className="flex items-center justify-center space-x-2 mb-5">
        {page !== 1 && (
          <button
            className="text-blue-500 px-4 py-2 rounded border border-transparent hover:text-blue-600"
            onClick={handlePrevious}
          >
            {"< Anterior"}
          </button>
        )}
        <span className="bg-gray-200 text-gray-500 flex justify-center ml-0 w-6">
          {page}
        </span>
        <div className="text-gray-500">de {Math.ceil(total / 10)}</div>
        <button
          className="text-blue-500 px-4 py-2 rounded border border-transparent hover:text-blue-600"
          onClick={handleNext}
          disabled={page === Math.ceil(total / 10)}
        >
          {"Siguiente >"}
        </button>
      </div>
    </nav>
  );
}
