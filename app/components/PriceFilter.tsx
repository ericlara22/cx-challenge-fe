import { useEffect, useState } from "react";
import { AppState } from "@/types/searchResponse";
import { useProductContext } from "@/context/ProductContext";

export default function PriceFilter() {
  const { state, dispatch } = useProductContext();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filter: AppState["availablePricesRanges"] = state.availablePricesRanges;

  const handleValueChange = (valueId: string) => {
    const [min, max] = valueId.split("-");
    dispatch({ type: "SET_PRICE_RANGE", payload: { min, max } });
  };

  const handleApplyCustomFilter = () => {
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: { min: minPrice, max: maxPrice },
    });
  };

  const formatPrice = (price: string) => {
    const response =
      price === "*"
        ? ""
        : price.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return response;
  };

  useEffect(() => {
    setMinPrice(formatPrice(state.priceRange.min));
    setMaxPrice(formatPrice(state.priceRange.max));
  }, [state]);

  const isApplyButtonDisabled = !minPrice && !maxPrice;

  return (
    <div className="w-1/4 pr-5 min-w-fit mt-7">
      <div className="flex flex-col items-start space-y-2">
        <label htmlFor={filter.id} className="font-bold">
          Precio
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
              isApplyButtonDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500"
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
