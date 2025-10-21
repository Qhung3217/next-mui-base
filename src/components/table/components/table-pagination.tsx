import type { SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

type Props = {
  pageCount: number;
  totalRows: number;
  page: number;
  perPage: number;
  handlePageChange: (value: number) => void;
  handlePerPageChange: (value: number | string) => void;
  sx?: SxProps;
};
export default function TablePagination({
  page,
  perPage,
  pageCount,
  handlePageChange,
  handlePerPageChange,
  totalRows,
  sx,
}: Props) {
  const computeSummary = (totalItems: number): string => {
    if (totalItems === 0) {
      return `0 - 0 trong 0 hàng`;
    }

    const start = (page - 1) * perPage + 1;
    let end = page * perPage;
    if (end > totalItems) {
      end = totalItems;
    }

    return `${start} - ${end} trong ${totalItems || 0} hàng`;
  };

  return (
    <Stack
      direction={{
        xs: 'column-reverse',
        md: 'row',
      }}
      spacing={{
        xs: 1,
        md: 0,
      }}
      alignItems="center"
      justifyContent="space-between"
      sx={{ borderTop: '1px solid #f4f4f4', borderRadius: 1, py: 1, px: 1, ...sx }}
    >
      <Pagination
        count={pageCount}
        size="small"
        page={page}
        onChange={(e, newPage) => handlePageChange(newPage)}
        sx={{ flexShrink: 0 }}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          minWidth: 0,
          width: { xs: 1, md: 'unset' },
          display: {
            xs: 'flex',
            md: 'contents',
          },
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ lineHeight: 1 }}>
            {computeSummary(totalRows)}
          </Typography>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body2" sx={{ lineHeight: 1 }}>
              Hiển thị
            </Typography>
            <Select
              size="small"
              sx={{
                height: 30,
              }}
              value={perPage}
              onChange={(event) => {
                handlePerPageChange(event.target.value);
              }}
              slotProps={{
                input: {
                  sx: {
                    minHeight: 'unset',
                    py: 0.5,
                    fontSize: 14,
                  },
                },
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
            <Typography variant="body2" sx={{ lineHeight: 1 }}>
              hàng
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
