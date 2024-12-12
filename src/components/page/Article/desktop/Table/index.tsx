import Table from '@/components/ui/Table/Table';
import { env } from '@/utils/env';
import { getCardArticleStatus } from '@/utils/validations/article.validation';
import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

function TableArticleManagement(props: any) {
  const { rows } = props;

  const basicColumns: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Tên bài báo',
        field: 'name',
        flex: 1.4,
      },
      {
        headerName: 'Ngày đăng bài',
        field: 'publicDate',
        flex: 0.4,
        headerAlign: 'right',
        align: 'right',
        renderCell: (params) => <Typography>{dayjs(params.value).format('DD/MM/YYYY')}</Typography>,
      },
      {
        headerName: 'Điểm cộng',
        field: 'bonusScore',
        flex: 0.5,
        align: 'right',
        headerAlign: 'right',
      },
      {
        headerName: 'Tải file',
        field: 'link',
        flex: 0.4,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Typography
            component={'a'}
            href={`${env.API_URL}/${params.value}`}
            target='_blank'
            variant='body1'
            color='primary'
          >
            Xem chi tiết
          </Typography>
        ),
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        flex: 0.6,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => <Box>{getCardArticleStatus(params.row.status)}</Box>,
      },
    ],
    [],
  );

  return (
    <>
      <Box>
        <Table
          rows={rows}
          sx={{
            bgcolor: 'white',
          }}
          rowHeight={100}
          columns={basicColumns}
          totalItems={rows?.length}
          disableColumnFilter
          minHeight={400}
          isPanigation={false}
        />
      </Box>
    </>
  );
}

export default TableArticleManagement;
