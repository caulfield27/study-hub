export const apiRoutes = {
  suggestions: '/books/suggestions',
  books: {
    post: "/books",
    get: (
      search: string,
      page: number,
      pageSize: number,
      sort_by_rating: boolean = false,
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
  courses: {
    get: (query: string) => `/courses${query}`,
    getBySlug: (slug: string) => `/courses/${slug}`,
    getCategories: "/courses/categories",
    postReview: (id: number) => `/courses/review/${id}`,
  },
  login: "/login",
  register: "/register",
  me: "/me",
  search: (query: string) => `/search?q=${query}`,
};
