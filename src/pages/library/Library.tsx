import useSwr, { mutate } from "swr";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import type { IBook } from "@/shared/types/types";
import { Book, PostBookModal } from "./_components";
import { useState } from "react";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";
import { BooksSkeleton } from "@/shared/skeletons/books/BooksSkeleton";
import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";
import { LibraryIcon } from "lucide-react";

function Library() {
  // locale states
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
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
        <PageHeader
          Icon={LibraryIcon}
          label="Библиотека"
          title="Откройте библиотеку знаний и прокачайте навыки разработки"
          description="Подборка лучших книг по программированию от базовых концепций до продвинутых практик.
              Учитесь в своем ритме и углубляйте понимание технологий."
        />
        <Button
          variant="ghost"
          className="w-fit max-sm:w-full"
          onPress={() => setIsPostModalOpen(true)}
          color="primary"
        >
          Предложить книгу
        </Button>
        <div className="flex flex-col">
          {isLoading ? (
            <BooksSkeleton size={10} />
          ) : (
            <>
              <div className="flex flex-row flex-wrap gap-8 mb-12.5 justify-center items-start">
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
