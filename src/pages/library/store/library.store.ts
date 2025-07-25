import { create } from "zustand";
import type { IBook } from "../types/types";
// import { IFavBooks, IStates, books } from "./booksTypes";
// import { IUserItem } from "../auth/auth";
// import { setToStorage } from "@/utils/useLocaleStorage";

interface IStates {
  isPostModalOpen: boolean;
  isDropdownOpen: boolean;
  currentBook: IBook | null;
  // favorites: IFavBooks[],
  // booksNotifications: number,
  // totalNotifications: number
}

type Actions = {
  setCurrentBook: (payload: IBook | null) => void;
  setDropdown: (pl: boolean) => void;
  // getUserFavorites: (payload: IFavBooks[])=> void,
  // resetFavBooks: ()=> void,
  // incrementCounter: (payload:number)=> void,
  // decrementCounter: (payload: number)=> void,
  //   getBooksCounter: (payload: number) => void;
  // resetNotifications: (payload: number)=> void,
  setPostModal: (pl: boolean) => void;
  //   setTotalNotifications: (payload: number) => void;
};

export const useLibrary = create<IStates & Actions>((set) => ({
  isPostModalOpen: false,
  isDropdownOpen: false,
  currentBook: null,
  favorites: [],
  // booksNotifications: 0,
  // totalNotifications: 0,
  setPostModal: (pl) => set(() => ({ isPostModalOpen: pl })),
  setCurrentBook: (payload) => set(() => ({ currentBook: payload })),
  setDropdown: (pl) => set(() => ({ isDropdownOpen: pl })),
  // getUserFavorites: (payload) => set(()=> ({favorites: payload})),
  // resetFavBooks: () => set(()=> ({favorites: []})),
  // incrementCounter:(payload)=>{
  //     setToStorage<number>('favBooksCounter', payload === null ? 0 : payload);
  //     set(()=> ({booksNotifications:payload}))
  // },
  // decrementCounter:(payload)=>{
  //     setToStorage<number>('favBooksCounter', payload);
  //     set(()=> ({booksNotifications:payload}))
  // },
  //   getBooksCounter: (payload) => set(() => ({ booksNotifications: payload })),
  // resetNotifications: (payload)=>{
  //     setToStorage<number>('favBooksCounter', payload);
  //     set(()=> ({booksNotifications: payload}))
  // },
  //   setTotalNotifications: (payload) => set(() => ({ totalNotifications: payload })),
}));

// export const setUserFavBooks = (favBooks:IFavBooks[], getUserFavorites:Function,currentUser:IUserItem[])=>{
//     const  customFav = favBooks ? favBooks.filter(book => book.userToken === currentUser[0].userToken) : []
//     getUserFavorites(customFav)
// }
