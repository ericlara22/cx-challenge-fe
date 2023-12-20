import Searchbar from "./Searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <header className="h-16 bg-yellow-300 px-4 flex">
        <Searchbar />
      </header>
      <main className="max-w-screen-xl m-auto mt-10">{children}</main>
    </>
  );
}
