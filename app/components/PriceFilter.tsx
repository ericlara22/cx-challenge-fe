import { useEffect, useState } from "react";
import { AppState } from "@/types/searchResponse";
import { useProductContext } from "@/context/ProductContext";

import { useRouter } from "next/router";

export default function PriceFilter() {
  const { state, dispatch } = useProductContext();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const router = useRouter();

  const filter: AppState["availablePricesRanges"] = state.availablePricesRanges;

  const handleSelectValue = (valueId: string) => {
    const [min, max] = valueId.split("-");
    handleSubmit(min, max);
  };

  const handleCustomValues = () => {
    handleSubmit(removeDots(minPrice), removeDots(maxPrice));
  };

  const handleSubmit = (min: string, max: string) => {
    min = min.length > 0 ? min : "*";
    max = max.length > 0 ? max : "*";
    router.push({
      pathname: "/",
      query: { ...router.query, price: `${min}-${max}` },
    });
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: { min, max },
    });
  };

  const formatPrice = (price: string) => {
    const response =
      price === "*"
        ? ""
        : price.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return response;
  };

  const removeDots = (price: string) => {
    return price.replace(/\./g, "");
  };

  useEffect(() => {
    if (state.priceRange.min || state.priceRange.max) {
      setMinPrice(formatPrice(state.priceRange.min));
      setMaxPrice(formatPrice(state.priceRange.max));
    }
  }, [state]);

  const isApplyButtonDisabled = !minPrice && !maxPrice;

  return (
    <div className="w-1/4 pr-5 min-w-fit mt-7">
      <div className="flex flex-col items-start space-y-2">
        <label htmlFor={"precio"} className="font-bold">
          Precio
        </label>

        {filter &&
          filter.values.map((value: any, index: number) => (
            <button
              key={index}
              onClick={() => handleSelectValue(value.id)}
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
            onClick={handleCustomValues}
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
