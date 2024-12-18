export const urls= {
  order: {
    list: (page: number) => `/orders?page=${page}&limit=5`
  },
  category: {
    list: "/categories",
    byId: (id: string) => `/categories/${id}`
  },
  subCategory: {
    list: "/subcategories?limit=total",
    byId: (id: string) => `/subcategories/${id}`,
  },
  user: {
    login: "/auth/login",
    list: "/users",
    byId: (id: string) => `/users/${id}`
  },
  product: {
    list: (page: number, perPage: number) => `/products?page=${page}&limit=${perPage}`,
    byId: (id: string) => `/products/${id}`,
    create: "/products"
  }
}