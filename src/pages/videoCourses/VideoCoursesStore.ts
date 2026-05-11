import { create } from "zustand";
import type { CourseFiltersState } from "./VideoCoursesTypes";

const filtersToSearchParams = (
  filters: CourseFiltersState,
): URLSearchParams => {
  const params = new URLSearchParams();
  if (filters.category.length)
    params.set("category", filters.category.join(","));
  if (filters.price !== "all") params.set("price", filters.price);
  if (filters.rating !== "all") params.set("rating", filters.rating + "");
  if (filters.lang !== "all") params.set("lang", filters.lang);
  params.set("sort", filters.sort);
  return params;
};

interface IState {
  filters: CourseFiltersState;
  mobileFiltersOpen: boolean;
}

type Actions = {
  updateFilters: (key: keyof CourseFiltersState, value: unknown) => void;
  setMobileFiltersOpen: (open: boolean) => void;
  reset: () => void;
};

const initialFilters: CourseFiltersState = {
  category: [],
  price: "all",
  rating: "all",
  lang: "all",
  sort: "popularity",
};

export const useFilters = create<IState & Actions>((set) => ({
  filters: initialFilters,
  mobileFiltersOpen: false,
  updateFilters: (key, value) => {
    set((state) => {
      const next = { ...state.filters, [key]: value };
      return { filters: next, mobileFiltersOpen: false };
    });
  },

  reset: () => {
    set({ filters: initialFilters, mobileFiltersOpen: false});
  },

  setMobileFiltersOpen: (open) => set({ mobileFiltersOpen: open }),
}));

export const getApiQuery = (filters: CourseFiltersState) =>
  `?${filtersToSearchParams(filters).toString()}`;
