import useSwr, { mutate } from "swr";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import type { IBook } from "@/shared/types/types";
import { Book, PostBookModal } from "./_components";
import { useEffect, useState } from "react";
import useDebounce from "@/shared/hooks/useDebounce";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";
import { BooksSkeleton } from "@/shared/skeletons/books/BooksSkeleton";

function Library() {
  // locale states
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
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
  }>([swrParams, "public"], api.sendRequest, { revalidateOnFocus: false });

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
            <Button
              variant="ghost"
              className="max-sm:w-full"
              onPress={() => setIsPostModalOpen(true)}
              color="primary"
            >
              Предложить книгу
            </Button>
          </div>
        </div>

        <div className="flex flex-col">
          {isLoading ? (
            <BooksSkeleton size={10} />
          ) : (
            <>
              <div className="flex flex-row flex-wrap gap-5 mb-[50px] justify-center items-start">
                {error ? null : books?.data?.map((book) => <Book key={book.id} book={book} />)}
              </div>
              {books?.total && books.total > query.pageSize ? (
                <Pagination
                  showControls
                  total={Math.ceil(books.total / query.pageSize)}
                  initialPage={query.page}
                  onChange={handlePageChange}
                />
              ) : null}
            </>
          )}
        </div>
      </div>
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
