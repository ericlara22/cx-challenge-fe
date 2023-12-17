// components/SearchBar.tsx
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import magnifierIcon from "@/public/assets/icons/magnifier.svg";


interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
      <form action="/items" className="m-auto flex max-w-screen-xl flex-1">
        <Image src={logo} alt="Mercado Libre" width={50} />
        <input
          className="h-8 flex-1 pl-2 ml-4"
          name="search"
          type="text"
          placeholder="Buscar"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit" className="bg-gray-200 px-3 h-8">
          <Image src={magnifierIcon} alt="Buscar" width={20} height={20} />
        </button>
      </form>
  );
};

export default SearchBar;
