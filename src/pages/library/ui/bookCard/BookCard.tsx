// import { books } from "@/store/books/booksTypes"
import { base_url } from "../../../../shared/api/api.config";
import { useLibrary } from "../../store/library.store";
import type { IBook } from "../../types/types";
import { BooksModal } from "../bookInfoModal/BookModal";
import styles from "./BookCard.module.css";
// import { useBooks } from "@/store/books/books"
// import { useTheme } from '@/store/global/theme'

export const Book = ({ book, isOpen }: { book: IBook; isOpen: boolean }) => {
  const { setCurrentBook } = useLibrary();
  // const theme = useTheme((state)=> state.theme)

  function handleRead(e: any) {
    window.open(e.target.value, "_blank");
  }

  function openModal(book: IBook) {
    setCurrentBook(book);
    document.body.classList.add("open_modal");
  }

  return (
    <>
      {isOpen && <BooksModal />}
      <div className={styles.book_card}>
        <img src={`${base_url}/${book.image}`} alt={book.name} />
        <div className={styles.card_content}>
          <div className={styles.card_text}>
            <span className={styles.name}>{book.name}</span>
            <span className={styles.author}>{book.author}</span>
          </div>
          <div className={styles.card_button}>
            {/* <Button
              value={book.pdf}
              onClick={handleRead}
              // variant={!theme ? `outlined` : 'contained'}
              variant={"contained"}
              color="success"
            >
              читать
            </Button>
            <Button
              onClick={() => openModal(book)}
              // variant={!theme ? `outlined` : 'contained'}
              variant="contained"
              color="primary"
            >
              подробнее
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};
