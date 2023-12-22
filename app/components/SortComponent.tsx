import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useProductContext } from "@/context/ProductContext";

export default function SortComponent() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Más relevantes");
  const [categories, setCategories] = useState([
    "Más relevantes",
    "Menor precio",
    "Mayor precio",
  ]);

  const { state, dispatch } = useProductContext();

  const sorting = state.availableSorts;

  useEffect(() => {
    const selected = categories.find((category) =>
      sorting.every((sort: any) => sort.name !== category)
    );

    setSelectedCategory(selected || "Más relevantes");
  }, [sorting, categories]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSortChange = (item: any) => {
    const sort = sorting.find((sort: any) => sort.name === item);

    setIsDropdownOpen(false);
    // Update the URL with the selected sorting option
    if (sort) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, sort: sort.id },
      });
    }
  };

  return (
    <div className="relative inline-block">
      <span className="text-gray-600">Ordenar por:</span>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-gray-500 bg-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {selectedCategory}{" "}
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
          {categories.map((item: string) => (
            <li key={item}>
              <a
                href="#"
                className={`block px-4 py-3 hover:bg-gray-100 ${
                  selectedCategory === item
                    ? "border-l-4 border-blue-500 text-blue-500"
                    : "border-l-4 border-white hover:border-blue-200"
                }`}
                onClick={() => handleSortChange(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
