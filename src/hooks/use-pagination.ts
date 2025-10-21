'use client';

import { useMemo, useState } from 'react';

type Props<T> = {
  data: T[];
  rowsPerPage?: number;
};

export default function usePagination<T>({ data, rowsPerPage: rowsPerPageProp = 10 }: Props<T>) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(1);
  };
  const dataVisible = useMemo(() => {
    const start = Math.max(page - 1, 0) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [data, page, rowsPerPage]);

  const computeSummary = (): string => {
    const totalItems = data.length;
    if (totalItems === 0) {
      return `0 - 0 trong 0 hàng`;
    }

    const start = (page - 1) * rowsPerPage + 1;
    let end = page * rowsPerPage;
    if (end > totalItems) {
      end = totalItems;
    }

    return `${start} - ${end} trong ${totalItems || 0} hàng`;
  };

  return {
    page,
    rowsPerPage,
    totalPages,
    handleChangePage,
    handleChangeRowsPerPage,
    dataVisible,
    computeSummary,
  };
}
