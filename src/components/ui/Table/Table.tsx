import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  DataGrid,
  DataGridProps,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  viVN,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import DropDown from '../Dropdown';
interface Props extends DataGridProps {
  minHeight?: number;
  page?: number;
  totalPages?: number;
  totalItems: number;
  limit?: number;
  handleChangePage?: (page: number) => void;
  needReset?: boolean;
  isLimit?: boolean;
  slots?: any;
  isPanigation?: boolean;
  onReset?: () => void;
  handleChangeLimit?: (limit: number) => void;
  noData?: React.ReactNode;
}

export default function Table(props: Props) {
  const {
    minHeight = 500,
    sx,
    page,
    totalPages,
    totalItems,
    isPanigation = true,
    needReset,
    limit,
    isLimit,
    handleChangePage,
    handleChangeLimit,
    onReset,
    noData,
    slots,
    ...rest
  } = props;
  return (
    <Box
      style={{ minWidth: 0 }}
      sx={{
        width: '100%',
        minHeight,
      }}
    >
      <DataGrid
        disableRowSelectionOnClick
        hideFooter
        componentsProps={{
          cell: {
            style: {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: '1.5em',
              overflow: 'visible',
            },
          },
        }}
        localeText={{
          ...viVN.components.MuiDataGrid.defaultProps.localeText,
          toolbarColumns: 'Điều chỉnh Cột hiển thị',
          toolbarDensity: 'Thay đổi độ cao của dòng',
        }}
        slots={{
          ...slots,
          toolbar: () => (
            <GridToolbarContainer>
              <GridToolbarColumnsButton />
              <GridToolbarDensitySelector />
            </GridToolbarContainer>
          ),
          noRowsOverlay: () => (
            <Box
              mx={'auto'}
              display={'flex'}
              flexDirection={'column'}
              alignContent={'center'}
              justifyContent={'center'}
              textAlign={'center'}
              py={20}
              width={'100%'}
            >
              <Box>
                <img
                  style={{ opacity: 0.7 }}
                  width={200}
                  height={200}
                  src='/images/nodata.webp'
                  alt='nodata'
                />
              </Box>
              <Typography variant='h6' sx={{ mt: 2 }}>
                Không có dữ liệu ( Data not found)
              </Typography>
              <Box>{noData}</Box>
            </Box>
          ),
          loadingOverlay: () => <LinearProgress />,
        }}
        sx={{
          fontSize: 13,
          color: 'grey.900',
          cursor: 'pointer',
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-virtualScrollerContent': {
            minHeight,
            width: '100%',
          },
          '& .MuiDataGrid-columnHeaders': {
            position: 'relative',
            borderColor: 'text.disabled',
            bgcolor: {
              xs: 'grey.50',
              md: 'primary.dark',
            },
            color: {
              xs: 'grey.700',
              md: 'grey.400',
            },
            fontSize: {
              xs: 14,
              md: 'auto',
            },
            fontWeight: {
              xs: 'bold',
              md: 'auto',
            },
          },

          '& .MuiDataGrid-columnHeaderst > .MuiDataGrid-virtualScroller': {
            minHeight,
            overflowX: 'auto',
            '::-webkit-scrollbar': {
              height: 2,
            },
            '::-webkit-scrollbar-track': {
              background: 'transparent',
            },

            /* Handle */
            '::-webkit-scrollbar-thumb': {
              background: 'secondary.main',
            },

            /* Handle on hover */
            ' ::-webkit-scrollbar-thumb:hover': {
              background: 'secondary.main',
            },
          },
          ...sx,
        }}
        {...rest}
      />
      <Box display='flex' alignItems='center' justifyContent='space-between' mr={2} mt={4}>
        <Box display='flex' alignItems='center'>
          {isLimit && (
            <Box width={190}>
              <DropDown
                onChange={(e: any) => {
                  handleChangeLimit(e.target.value);
                }}
                value={limit}
                options={[
                  { _id: '10', name: 'Hiển thị 10 dòng' },
                  { _id: '15', name: 'Hiển thị 15 dòng' },
                  { _id: '20', name: 'Hiển thị 20 dòng' },
                  { _id: '30', name: 'Hiển thị 30 dòng' },
                  { _id: '50', name: 'Hiển thị 50 dòng' },
                  { _id: '100', name: 'Hiển thị 100 dòng' },
                  { _id: '300', name: 'Hiển thị 300 dòng' },
                ]}
              />
            </Box>
          )}
          <Typography variant='body1' sx={{ mx: 2 }} display='flex'>
            Tổng số dòng:{'  '}
            <Typography variant='body1' fontWeight={600}>
              {totalItems}
            </Typography>
          </Typography>
          {needReset && (
            <IconButton
              aria-label='reset'
              title='Làm mới'
              onClick={onReset}
              size='small'
              color='info'
            ></IconButton>
          )}
        </Box>
        {isPanigation && (
          <Pagination
            count={totalPages}
            variant='outlined'
            color='primary'
            shape='rounded'
            onChange={(_, page: number) => {
              handleChangePage(page);
            }}
            page={page}
          />
        )}
      </Box>
    </Box>
  );
}
