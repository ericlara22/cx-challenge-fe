import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useProductContext } from "@/context/ProductContext";
import { AppState, SearchResponse } from "@/types/searchResponse";

export default function SortComponent() {
  const { state, dispatch } = useProductContext();
  const [selectedCategory, setSelectedCategory] = useState(state.sort);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const router = useRouter();
  
  const categories = [
    {id: "relevance" ,name:"Más relevantes"},
    {id: "price_asc" ,name: "Menor precio"},
    {id: "price_desc" ,name:"Mayor precio"},
  ];
  
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  
  const handleSortChange = ( item: any ) => {
    const sorting = state.availableSorts;
    const sort: SearchResponse["sort"] = sorting.find(
      (sort: any) => sort.id === item
    ) || { id: "", name: "" };
    setIsDropdownOpen(false);
    setSelectedCategory(sort.id);
    dispatch({ type: "SET_SORT", payload: sort.id });
    router.push({
      pathname: "/",
      query: { ...router.query, sort: sort.id },
    });
  };

  useEffect(() => {
    setSelectedCategory(state.sort);
  }, [state.sort]);

  return (
    <div className="relative inline-block">
      <span className="text-gray-600">Ordenar por:</span>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-gray-500 bg-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {categories.find( el => el.id === selectedCategory)?.name}
        <svg
          className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdown"
        className={`z-10 ${
          isDropdownOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-1 left-10`}
      >
        <ul
          className="text-sm text-gray-700 dark:text-gray-500"
          aria-labelledby="dropdownDefaultButton"
        >
          {categories.map((item: {id:string, name: string}) => (
            <li key={item.id}>
              <button
                className={`block px-4 py-3 hover:bg-gray-100 w-full ${
                  selectedCategory === item.id
                    ? "border-l-4 border-blue-500 text-blue-500"
                    : "border-l-4 border-white hover:border-blue-200"
                }`}
                onClick={() => handleSortChange(item.id)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
