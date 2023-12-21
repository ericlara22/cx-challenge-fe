import Searchbar from "./Searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <header className="h-16 bg-yellow-300 flex">
        <Searchbar />
      </header>
      <main className="max-w-screen-xl m-auto mt-10 px-5">{children}</main>
    </>
  );
}
