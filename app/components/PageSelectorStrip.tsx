import { useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import { getPages } from "@/utils/pagination";

export default function PageSelectorStrip() {
  const { state, dispatch } = useProductContext();
  const [page, setPage] = useState(state.page);

  const total = getPages(state.paging);

  const handlePrevious = () => {
    const newPage = state.page - 1;
    dispatch({ type: "SET_PAGE", payload: newPage });
    setPage(newPage);
  };
  const handleNext = () => {
    const newPage = state.page + 1;
    dispatch({ type: "SET_PAGE", payload: state.page + 1 });
    setPage(newPage);
  };

  return (
    <nav>
      <div className="flex items-center justify-center space-x-2 mb-5">
        {page !== 0 && (
          <button
            className="text-blue-500 px-4 py-2 rounded border border-transparent hover:text-blue-600"
            onClick={handlePrevious}
          >
            {"< Anterior"}
          </button>
        )}
        <span className="bg-gray-200 text-gray-500 flex justify-center ml-0 w-6">
          {page + 1}
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
