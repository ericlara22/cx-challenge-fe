import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useProductContext } from "@/context/ProductContext";
import { getPages } from "@/utils/pagination";

export default function PageSelectorStrip() {
  const { state, dispatch } = useProductContext();
  const [page, setPage] = useState(1);

  const router = useRouter();
  const total = getPages(state.paging);

  const handlePrevious = () => {
    const newPage = Number(state.page) - 1;
    router.push({
      pathname: "/",
      query: { ...router.query, page: newPage },
    });
  };
  const handleNext = () => {
    const newPage = Number(state.page) + 1;
    router.push({
      pathname: "/",
      query: { ...router.query, page: newPage },
    });
  };

  useEffect(() => {
    setPage(Number(state.page));
  }, [state.page]);

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
        <div className="text-gray-500">de {total}</div>
        <button
          className="text-blue-500 px-4 py-2 rounded border border-transparent hover:text-blue-600"
          onClick={handleNext}
          disabled={page === total}
        >
          {"Siguiente >"}
        </button>
      </div>
    </nav>
  );
}
