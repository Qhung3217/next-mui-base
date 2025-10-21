import type { SxProps } from '@mui/material/styles';
import type { Row, Table } from '@tanstack/react-table';
import type { TableMetaCustom } from '../types';

import { Fragment, type ReactNode } from 'react';
import { flexRender } from '@tanstack/react-table';

import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';

import { LoadingSpinner } from 'src/components/loading';
import { EmptyContent } from 'src/components/empty-content';

import TablePagination from './table-pagination';
import { TBody, THead, TTable, TBodyRow, THeadRow, THeadCell, TBodyCell } from './elements';

type Props<T> = {
  table: Table<T>;

  slotProps?: {
    container?: SxProps;
    table?: SxProps;
    head?: { row?: SxProps; cell?: SxProps };
    body?: { row?: SxProps; cell?: SxProps };
    pagination?: SxProps;
  };
  slots?: {
    rowSelectedToolbar?: ReactNode;
    row?: (row: Row<T>) => ReactNode;
    subRow?: (row: Row<T>) => ReactNode;
  };
};
export default function TanstackTable<T>({
  table,

  slotProps,
  slots,
}: Props<T>) {
  const isLoading = (table.options.meta as TableMetaCustom)?.loading;
  const { pageSize, pageIndex } = table.getState().pagination;

  return (
    <Box
      sx={{
        flex: '1 1 0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: 1,

        ...slotProps?.container,
      }}
    >
      <TableContainer sx={{ flex: '1 1 0', position: 'relative' }}>
        <TTable
          sx={{
            ...slotProps?.table,
          }}
        >
          <colgroup>
            {table.getAllLeafColumns().map((column) => (
              <col
                key={column.id}
                style={{
                  width: column.getSize(),
                }}
              />
            ))}
          </colgroup>
          <THead>
            {table.getHeaderGroups().map((headerGroup) => (
              <THeadRow
                key={headerGroup.id}
                sx={{
                  ...(slotProps?.head?.row as any),
                }}
              >
                {headerGroup.headers.map((header) => (
                  <THeadCell
                    colSpan={header.colSpan}
                    rowSpan={header.rowSpan}
                    key={header.id}
                    isActionCell={header.id === 'actions'}
                    sx={{
                      ...header.column.columnDef.meta?.sx,
                      ...(Array.isArray(slotProps?.head?.cell)
                        ? slotProps.head.cell
                        : [slotProps?.head?.cell]),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </THeadCell>
                ))}
              </THeadRow>
            ))}
          </THead>
          <TBody
            sx={
              {
                // '& .expanded': {
                //   backgroundColor: '#f1f8fcff',
                //   borderRadius: 1,
                //   '&.expanded-head': {
                //     border: '1px solid #f7f8f8',
                //     borderBottom: 'none',
                //     borderBottomLeftRadius: 0,
                //     borderBottomRightRadius: 0,
                //   },
                //   '&.expanded-content': {
                //     backgroundColor: '#fafcfd',
                //     borderTop: 'none',
                //     borderTopLeftRadius: 0,
                //     borderTopRightRadius: 0,
                //     '&:hover': {
                //       background: 'transparent',
                //     },
                //   },
                // },
              }
            }
          >
            {!isLoading &&
              table.getRowModel().rows.map((row) => {
                const isExpanded = row.getCanExpand() && row.getIsExpanded();
                return slots?.row ? (
                  slots.row(row)
                ) : (
                  <Fragment key={row.id}>
                    <TBodyRow
                      className={isExpanded ? 'expanded expanded-head' : ''}
                      sx={slotProps?.body?.row}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TBodyCell
                          key={cell.id}
                          sx={{
                            wordBreak: 'break-word',
                            ...cell.column.columnDef.meta?.sx,
                            ...(Array.isArray(slotProps?.body?.cell)
                              ? slotProps.body.cell
                              : [slotProps?.body?.cell]),
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TBodyCell>
                      ))}
                    </TBodyRow>
                    {slots?.subRow && (
                      <TBodyRow
                        className={isExpanded ? 'expanded expanded-content' : ''}
                        sx={slotProps?.body?.row}
                      >
                        {slots.subRow(row)}
                      </TBodyRow>
                    )}
                  </Fragment>
                );
              })}

            {isLoading && (
              <TBodyRow
                sx={{
                  '&:hover': {
                    background: 'transparent !important',
                  },
                }}
              >
                <TBodyCell colSpan={table.getAllLeafColumns().length} sx={{ border: 'none' }}>
                  <LoadingSpinner />
                </TBodyCell>
              </TBodyRow>
            )}
            {!isLoading && table.getRowCount() === 0 && (
              <TBodyRow
                sx={{
                  '&:hover': {
                    background: 'transparent !important',
                  },
                }}
              >
                <TBodyCell colSpan={table.getAllLeafColumns().length} sx={{ border: 'none' }}>
                  <EmptyContent title="Không có dữ liệu" />
                </TBodyCell>
              </TBodyRow>
            )}
          </TBody>
        </TTable>
      </TableContainer>
      {slots?.rowSelectedToolbar}
      <TablePagination
        totalRows={table.getRowCount()}
        sx={slotProps?.pagination}
        pageCount={table.getPageCount()}
        page={pageIndex}
        perPage={pageSize}
        handlePageChange={(value) => {
          table.setPageIndex(value);
          // onPaginationChange({
          //   ...pagination,
          //   pageIndex: value - 1,
          // });
        }}
        handlePerPageChange={(value) => {
          table.setPagination({
            pageIndex: 1,
            pageSize: Number(value),
          });
          // onPaginationChange({
          //   ...pagination,
          //   pageSize: Number(value),
          // });
        }}
      />
    </Box>
  );
}
