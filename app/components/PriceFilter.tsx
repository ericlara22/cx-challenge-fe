import { useState } from "react";
import { useRouter } from "next/router";

export default function PriceFilter({ filter }: any) {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleValueChange = (valueId: string) => {
    updateURL({ ...router.query, price: valueId });
  };

  const handleApplyCustomFilter = () => {
    const priceRange = `${minPrice}-${maxPrice}`;
    updateURL({ ...router.query, price: priceRange });
  };

  const updateURL = (queryParams: { [key: string]: string }) => {
    const currentQuery = router.query;
    const newQuery = { ...currentQuery, ...queryParams };

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  const isApplyButtonDisabled = !minPrice && !maxPrice;

  return (
    <div className="w-1/4 pr-5 min-w-fit">
      <div className="flex flex-col items-start space-y-2">
        <label htmlFor={filter.id} className="font-bold">
          {filter.name}
        </label>

        {filter.values.map((value: any, index: number) => (
          <button
            key={index}
            onClick={() => handleValueChange(value.id)}
            className={"hover:text-blue-500"}
          >
            {value.name}
          </button>
        ))}

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded w-20 text-sm"
          />
          <span className="text-gray-400">-</span>
          <input
            type="text"
            placeholder="Máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded w-20 text-sm"
          />
          <button
            onClick={handleApplyCustomFilter}
            className={`${
              isApplyButtonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
            } text-white px-2.5 rounded-full`}
            disabled={isApplyButtonDisabled}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
