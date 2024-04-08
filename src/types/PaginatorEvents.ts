export interface PaginatorEvents {
  (event: 'changePage', page: number): void
  (event: 'changePerPage', page: number): void
}