export interface ApiResponse<T> {
  items: T;
  page: number;
  perPage: number;
  totalItems: number;
}
