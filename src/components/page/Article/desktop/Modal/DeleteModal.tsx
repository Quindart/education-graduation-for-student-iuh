import Modal from '@/components/ui/Modal';
import useArticle from '@/hook/api/useArticle';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';

function DeleteModal(props) {
  const { onClose, open, name, articleId } = props;
  const { OnRemoveArticle } = useArticle();
  const { mutate: remove, isSuccess } = OnRemoveArticle();
  const handleSubmit = () => {
    remove(articleId);
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);
  return (
    <Modal onClose={onClose} open={open}>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        px={10}
        py={12}
      >
        <Box borderRadius='50%' padding={6} sx={{ background: 'rgba(255, 49, 49, 0.2)' }}>
          <Icon color='#9B0F0FD4' height={70} width={70} icon='ph:article-ny-times' />
        </Box>
        <Typography variant='h6' textAlign={'center'} mt={10} mb={14}>
          Bạn có chắc chắn xóa bài báo {name} ?
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button onClick={handleSubmit} sx={{ width: '50%' }} color='success' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:tick-outline' />
            Đồng ý
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
