// import type {Metadata} from "next";

// export const metadata: Metadata = {
//   title: "Sorteos",
//   description: "App web for making raffles",
// };

import Searchbar from "./Searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  // this onsearch should be in the Context API
  const search = (query: string) => {
    console.log(query);
  };

  return (
    <>
      <header className="h-16 bg-yellow-300 px-4 flex">
        <Searchbar onSearch={search} />
      </header>
      <main className="max-w-screen-xl m-auto p-4">{children}</main>
    </>
  );
}
