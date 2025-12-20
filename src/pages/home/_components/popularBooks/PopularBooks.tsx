import { Book } from "@/pages/library/_components";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { BooksSkeleton } from "@/shared/skeletons/books/BooksSkeleton";
import type { IBook } from "@/shared/types/types";
import useSwr from "swr";

export const PopularBooks = () => {
  // api
  const swrParams = {
    method: "get",
    url: apiRoutes.books.get("", 1, 4),
  };
  const { data: books, isLoading } = useSwr<{
    data: IBook[];
    total: number;
  }>([swrParams, "public"], api.sendRequest);

  return (
    <div className="flex flex-row flex-nowrap gap-6 overflow-x-auto no-scrollbar">
      {isLoading ? (
        <BooksSkeleton size={4} isScrollable/>
      ) : (
        books?.data?.map((book) => <Book key={book.id} book={book} isScrollable={true}/>)
      )}
    </div>
  );
};
