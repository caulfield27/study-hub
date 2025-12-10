import { useLibrary } from "./Library.store";
import useSwr, { mutate } from "swr";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { DataLoader } from "@/shared/ui/DataLoader/DataLoader";
import type { IBook } from "./Library.types";
import { Book, PostBookModal, BooksModal } from "./_components";
import { useEffect, useState } from "react";
import useDebounce from "@/shared/hooks/useDebounce";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";

function Library() {
  // zustand store states
  const currentBook = useLibrary((state) => state.currentBook);
  const setCurrentBook = useLibrary((state) => state.setCurrentBook);

  // locale states
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 1000);
  const [query, setQuery] = useState({
    page: 1,
    pageSize: 15,
    search: "",
  });
  const swrParams = {
    method: "get",
    url: apiRoutes.books.get(query.search, query.page, query.pageSize),
  };
  const {
    data: books,
    isLoading,
    error,
  } = useSwr<{
    data: IBook[];
    total: number;
  }>([swrParams,'public'], api.sendRequest, { revalidateOnFocus: false });

  // effect handlers
  useEffect(() => {
    setQuery((prev) => ({ ...prev, page: 1, search: debouncedValue }));
  }, [debouncedValue]);

  // event handlers
  function handlePageChange(page: number) {
    setQuery((prev) => ({ ...prev, page }));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* <div className="text-[32px] max-sm:text-[24px] font-bold max-[1150px]:flex max-[1150px]:justify-center max-[590px]:mx-[15px]">
          <h1>Подборка книг от сообщества Study Hub</h1>
        </div> */}
        <div
          className="
        w-full max-h-fit 
        px-[35px] py-2.5
        bg-(--sidebar-bg)
        rounded
        flex flex-row justify-start items-center
        gap-[50px]
      "
        >
          <div className="w-full flex items-center gap-[15px] max-sm:flex-col-reverse">
            <input
              placeholder="Поиск..."
              className="text-black bg-(--foreground) border-0 rounded px-2.5 py-2.5 outline-none
            placeholder:text-[16px]
            max-[785px]:border max-[785px]:border-gray-400 max-sm:w-full"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button variant="ghost" className="max-sm:w-full" onPress={() => setIsPostModalOpen(true)} color="primary">Предложить книгу</Button>
          </div>
        </div>

        {/* BOOKS WRAPPER */}
        <div className="flex flex-col">
          <div className="flex f ex-row flex-wrap gap-5 mb-[50px] justify-center items-start">
            {isLoading ? (
              <DataLoader />
            ) : error ? null : (
              books?.data?.map((book) => (
                <Book
                  onBookOpen={() => {
                    setIsBookModalOpen(true);
                    setCurrentBook(book);
                  }}
                  key={book.id}
                  book={book}
                />
              ))
            )}
          </div>

          {books?.total && books.total > query.pageSize ? (
            <Pagination
              showControls
              total={Math.ceil(books.total / query.pageSize)}
              initialPage={query.page}
              onChange={handlePageChange}
            />
          ) : null}
        </div>
      </div>
      {currentBook && (
        <BooksModal
          isOpen={isBookModalOpen}
          onClose={() => {
            setIsBookModalOpen(false);
            setCurrentBook(null);
          }}
        /> 
      )}
      {isPostModalOpen && (
        <PostBookModal
          onSuccess={() => mutate(swrParams)}
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
        />
      )}
    </>
  );
}

export default Library;
