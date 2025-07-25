export const apiRoutes = {
  books: {
    post: "/books",
    get: (search: string, page: number, pageSize: number) =>
      `/books?page=${page}&pageSize=${pageSize}${search ? `&search=${search}` : ""}`,
  },
  quizes: {
    get: "/quizes",
    getById: (id: string) => `/quizes/${id}`
  }
};
