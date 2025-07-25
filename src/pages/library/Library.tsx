import { Button } from "@mui/material";
import { PostBookModal } from "./ui/postBookModal/PostBookModal";
import styles from "./Library.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useLibrary } from "./store/library.store";
import useSwr, { mutate } from "swr";
import { sendRequest } from "../../shared/api/api.handlers";
import { apiRoutes } from "../../shared/api/api.routes";
import { DataLoader } from "../../shared/ui/DataLoader/DataLoader";
import type { IBook } from "./types/types";
import { Book } from "./ui/bookCard/BookCard";
import { useEffect, useState } from "react";
import useDebounce from "../../shared/hooks/useDebounce";
import { CustomPagination } from "../../shared/ui/Pagination/Pagination";

function Library() {
  // zustand store states
  const { setPostModal } = useLibrary();
  const isPostModalOpen = useLibrary((state) => state.isPostModalOpen);
  const currentBook = useLibrary((state) => state.currentBook);

  // locale states
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
  }>(swrParams, sendRequest, { revalidateOnFocus: false });

  // effect handlers
  useEffect(() => {
    setQuery((prev) => ({ ...prev, page: 1, search: debouncedValue }));
  }, [debouncedValue]);

  // event handlers
  function handlePageChange(_: unknown, value: number) {
    setQuery((prev) => ({ ...prev, page: value }));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className={styles.library_header}>
        <h1>Подборка книг от сообщества Study Hub</h1>
      </div>
      <div className={styles.header_container}>
        <div className={styles.library_navigation}>
          <SearchIcon />
          <input
            placeholder="Поиск..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          />
        </div>
        <Button onClick={() => setPostModal(true)} variant="contained" color="primary">
          Добавить книгу
        </Button>
        {isPostModalOpen && <PostBookModal onSuccess={() => mutate(swrParams)} />}
      </div>
      <div className={styles.books_wrapper}>
        <div className={styles.books_container}>
          {isLoading ? (
            <DataLoader />
          ) : error ? null : (
            books?.data?.map((book) => {
              return <Book isOpen={currentBook?.id === book.id} key={book.id} book={book} />;
            })
          )}
        </div>
        {books?.total && books.total > query.pageSize && (
          <CustomPagination
            total={books.total}
            currentPage={query.page}
            limit={query.pageSize}
            handleChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default Library;
