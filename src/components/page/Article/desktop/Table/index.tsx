import Table from '@/components/ui/Table/Table';
import { getCardArticleStatus } from '@/utils/validations/article.validation';
import { Icon } from '@iconify/react';
import { Box, IconButton, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import UpdateArticleModal from '../Modal/UpdateModal';
import DeleteModal from '../Modal/DeleteModal';
import { env } from '@/utils/env';

function TableArticleManagement(props: any) {
  const { rows } = props;
  const [openUpdate, setOpenUpdate] = useState<{ isOpen: boolean; articleId: any }>({
    isOpen: false,
    articleId: '',
  });
  const handleOpenUpdate = (articleId: string) => {
    setOpenUpdate({ isOpen: true, articleId: articleId });
  };
  const handleCloseUpdate = () => {
    setOpenUpdate((pre) => ({ ...pre, isOpen: false }));
  };
  const [openRemoveModal, setOnRemoveModal] = useState<{
    isOpen: boolean;
    articleId: string;
    name: string;
  }>({ isOpen: false, articleId: '', name: '' });
  const handleOpenRemoveModal = (articleId: string, name: string) => {
    setOnRemoveModal({ isOpen: true, articleId: articleId, name: name });
  };
  const handleCloseRemoveModal = () => {
    setOnRemoveModal((pre) => ({ ...pre, isOpen: false }));
  };
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
        headerName: 'Nhận xét',
        field: 'comment',
        flex: 0.8,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <Box>
            {params.value == '' || !params.value ? (
              <Typography variant='body1' component={'i'} color='initial'>
                Chưa có nhận xét
              </Typography>
            ) : (
              <Box>
                <Typography variant='body1' component={'i'} color='initial'>
                  {params?.value}
                </Typography>
              </Box>
            )}
          </Box>
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
      {
        headerName: 'Chức năng',
        field: 'feature',
        renderCell: (params) => (
          <Box>
            <IconButton onClick={() => handleOpenUpdate(params?.row?.id)}>
              <Icon
                icon='iconamoon:edit-light'
                width={22}
                style={{ color: '#2f69ac' }}
                height='22'
              />
            </IconButton>
            <IconButton onClick={() => handleOpenRemoveModal(params?.row?.id, params?.row?.name)}>
              <Icon
                icon='clarity:remove-solid'
                width={22}
                style={{ color: '#ac2f2f' }}
                height='22'
              />
            </IconButton>
          </Box>
        ),
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
      <UpdateArticleModal
        onClose={handleCloseUpdate}
        open={openUpdate.isOpen}
        articleId={openUpdate.articleId}
      />
      <DeleteModal
        onClose={handleCloseRemoveModal}
        open={openRemoveModal.isOpen}
        name={openRemoveModal.name}
        articleId={openRemoveModal.articleId}
      />
    </>
  );
}

export default TableArticleManagement;
