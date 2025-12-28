export const apiRoutes = {
  books: {
    post: "/books",
    get: (
      search: string,
      page: number,
      pageSize: number,
      sort_by_rating: boolean = false
    ) =>
      `/books?page=${page}&pageSize=${pageSize}${
        search ? `&search=${search}` : ""
      }${sort_by_rating ? "&sort_by_rating=true" : ""}`,
    getById: (id: string) => `/books/${id}`,
    postReview: (id: number) => `/books/review/${id}`,
  },
  quizes: {
    get: "/quizes",
    getById: (id: string) => `/quizes/${id}`,
    getRecommended: "/quizes?recommended=true",
  },
  login: "/login",
  register: "/register",
  me: "/me",
};
