import styles from "./BookModal.module.css";
// import { useEffect, useState } from 'react'
// import { useBooks } from '@/store/books/books';
// import Swal from 'sweetalert2'
// import { IFavBooks } from '@/store/books/booksTypes';
// import useAuth from '@/store/auth/auth';
// import { getFromStorage, setToStorage } from '@/utils/useLocaleStorage';
import { useLibrary } from "../../store/library.store";
import { Modal } from "../../../../shared/ui/Modal/Modal";
import { base_url } from "../../../../shared/api/api.config";

export function BooksModal() {
  const { currentBook, setCurrentBook } = useLibrary();
  // const isBooksModalOpen = useLibrary((state)=> state.isBooksModalOpen);
  // const favorites = useBooks((state)=> state.favorites)
  // const getUserFavorites = useBooks((state)=> state.getUserFavorites)
  // let booksNotifications = useBooks((state)=> state.booksNotifications)
  // const incrementNot = useBooks((state)=> state.incrementCounter)
  // const decrementNot = useBooks((state)=> state.decrementCounter)
  // const setTotalNotifications = useBooks((state)=> state.setTotalNotifications)
  // let totalNotifications = useBooks((state)=> state.totalNotifications)
  // const {isAuth, currentUser} = useAuth((state) => state)

  // const handleCloseModal = (e: any) => {
  //     if (e.target.classList.contains(styles.modal_container)) {
  //         setBooksModal(false)
  //         document.body.classList.remove('open_modal')
  //     }

  // }

  // useEffect(() => {
  //     document.addEventListener('click', handleCloseModal)
  //     return () => {
  //         document.removeEventListener('click', handleCloseModal)
  //     }
  // }, [])

  // const handleFavorites = (book: any) => {
  //     const getFavStorage = getFromStorage('favorites')

  //     if (isAuth) {
  //         if (favorites.some((favBook: { currentBook: { id: any; }; }) => favBook.currentBook.id === book.id)) {
  //             const filtered = favorites.filter((book: { currentBook: { id: any; }; }) => book.currentBook.id !== currentBook.id)
  //             getUserFavorites(filtered)
  //             if(booksNotifications !== 0){
  //                 decrementNot(booksNotifications-=1)
  //                 setTotalNotifications(totalNotifications-=1)
  //             }
  //             if(getFavStorage){
  //                 const removedBook = getFavStorage.filter((removeBook: IFavBooks)  => removeBook.currentBook.id !== book.id)
  //                 setToStorage('favorites', removedBook)

  //             }

  //         } else {
  //             const favBooks = { userToken: currentUser[0].userToken, currentBook: book }
  //             if (getFavStorage) {

  //                 getFavStorage.push(favBooks)
  //                 setToStorage('favorites', getFavStorage)
  //                 const newFavList = [...favorites, favBooks]
  //                 getUserFavorites(newFavList)
  //             }else{
  //                 const newFavorites = []
  //                 newFavorites.push(favBooks)
  //                 setToStorage('favorites', newFavorites)

  //             }
  //             incrementNot(booksNotifications+=1)
  //             setTotalNotifications(totalNotifications+=1)
  //             Swal.fire({
  //                 text: 'added to favorite courses',
  //                 icon: 'success',
  //                 confirmButtonText: 'ok'
  //             }).then((result)=>{
  //                 if(result.isConfirmed){
  //                     setBooksModal(false)
  //                 }
  //             })

  //         }
  //     } else {
  //         Swal.fire({
  //             title: "Error",
  //             text: 'login for settung your favorite books',
  //             icon: "info",
  //             footer: '<a href="\login">login</a>'

  //         })
  //     }

  // }

  return (
    <Modal classes={styles.modal_content} onClose={() => setCurrentBook(null)}>
      {/* <div className={booksModal ? `${styles.modal_container} ${styles.display_block}` : styles.display_none}> */}
      {/* <div className={styles.modal_content}> */}
      <div className={styles.left_wrap}>
        <img src={`${base_url}/${currentBook?.image}`} alt={currentBook?.name}></img>
        <h2>{currentBook?.name}</h2>
      </div>
      <div className={styles.right_wrap}>
        <div className={styles.rating_button}>
          <div className={styles.rating}>
            {/* <Rating name="half-rating-read" value={currentBook?.rating} precision={0.5} readOnly /> */}
            <span>{currentBook?.rating}</span>
          </div>
          <div className={styles.modal_button}>
            {/* <button onClick={() => handleFavorites(currentBook)}> */}
            <button onClick={() => {}}>
              {/* <FavoriteIcon className={favorites.some((book: { currentBook: { id: any; }; }) => book.currentBook.id === currentBook.id) ? styles.favoriteActive : styles.favorite} /> */}
              {/* <FavoriteIcon className={styles.favorite} /> */}
              <span className={styles.favoriteText}>Add to favorites</span>
            </button>
            <button></button>
          </div>
        </div>
        <div className={styles.modal_textWrap}>
          <span className={styles.head}>Author:</span>
          <span className={styles.second}>{currentBook?.author}</span>
        </div>
        <div className={styles.modal_textWrap}>
          <span className={styles.head}>Released:</span>
          <span className={styles.second}>{currentBook?.released}</span>
        </div>
        <span className={styles.head}>Description:</span>
        <div className={styles.description}>
          <p>{currentBook?.description}</p>
        </div>
      </div>
      {/* </div>

            </div> */}
    </Modal>
  );
}
