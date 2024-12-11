export const urls= {
  order: {
    list: (page: number) => `/orders?page=${page}&limit=5`
  },
  category: {
    list: "/categories"
  },
  subCategory: {
    list: "/subcategories"
  },
  user: {
    login: "/auth/login",
    list: "/users",
    byId: (id: string) => `/users/${id}`
  },
  product: {
    list: (page: number) => `/products?page=${page}&limit=5`,
    all: (perPage: number) => `/products?limit=${perPage}`,
    delete:(id: string) => `/products/${id}`
  }
}