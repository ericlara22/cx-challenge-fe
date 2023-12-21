import React, { ChangeEvent, useState } from "react";
import { useRouter } from 'next/router'
import { useProductContext } from "@/context/ProductContext";
import Image from "next/image";
import logo from "@/public/logo.png";
import magnifierIcon from "@/public/assets/icons/magnifier.svg";

const SearchBar: React.FC = () => {
  const { products, updateProducts } = useProductContext();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { search: searchQuery },
    });
  };

  return (
    <div className="flex max-w-screen-xl w-full m-auto px-5">
      <form onSubmit={handleSubmit} className="m-auto flex max-w-screen-xl flex-1">
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
    </div>
  );
};

export default SearchBar;
