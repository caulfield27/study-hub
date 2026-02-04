export const apiRoutes = {
  books: {
    post: "/books",
    get: (search: string, page: number, pageSize: number) =>
      `/books?page=${page}&pageSize=${pageSize}${search ? `&search=${search}` : ""}`,
    getById: (id: string) => `/books/${id}`,
    postReview: (id: number) => `/books/review/${id}`,
  },
  quizes: {
    get: "/quizes",
    getById: (id: string) => `/quizes/${id}`,
  },
  login: "/login",
  register: "/register",
  me: "/me",
  search: (query: string) => `/search?q=${query}`,
};
