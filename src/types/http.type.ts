/* -------------------------------------------- */
/*                   RESPONSE                   */
/* -------------------------------------------- */
export type HttpError = {
  message: string;
  errorCode: string;
  errors?: string[];
  invalidValue?: string;
};

export type Paginate = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
  totalPages: number;
};

export type ApiResponseList<T> = {
  list: T;
  meta: Paginate;
};

/* -------------------------------------------- */
/*                   REQUEST                    */
/* -------------------------------------------- */
export type SearchOrderBy = 'asc' | 'desc';

export type BaseReqSearchParams = {
  page?: number;
  perPage?: number;
  sortBy?: string;
  orderBy?: SearchOrderBy;
  keyword?: string;
};
