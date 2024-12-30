import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Formik } from 'formik';
import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import validateSchemaArticle from '../context';
import dayjs from 'dayjs';
import Modal from '@/components/ui/Modal';
import CardFile from '@/components/ui/CardFile';
import useUploadFile from '@/hook/ui/useUpload';
import styled from '@emotion/styled';
import useArticle from '@/hook/api/useArticle';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useSnackbar } from 'notistack';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '100%',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: '100%',
});

function UpdateArticleModal({ open, onClose, articleId }: any) {
  const {
    currentFile,
    setCurrentFile,
    fileName,
    valueLoading,
    totalSize,
    updateArticle,
    importFileToForm,
  } = useUploadFile();
  const { HandleGetArticleById } = useArticle();
  const { article, isLoading } = HandleGetArticleById(articleId);
  const handleSubmit = async (values: any) => {
    const data = {
      name: values?.name,
      type: values?.type,
      publicDate: dayjs(values?.publicDate).format('YYYY-MM-DD'),
      author: values?.author,
      authorNumber: values?.authorNumber,
    };

    if (!currentFile) enqueueSnackbar({ message: 'Bạn chưa tải file lên', variant: 'error' });

    await updateArticle(currentFile, article.id, data);
  };
  const onClearFormFile = () => {
    setCurrentFile(undefined);
  };
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Modal maxWidth='md' open={open} onClose={onClose}>
      <Paper sx={{ px: 10, py: 12 }} elevation={0}>
        <Box mb={10}>
          <Typography
            mb={10}
            variant='h6'
            textTransform='uppercase'
            fontWeight='bold'
            color='primary.main'
          >
            Submit bài báo khoa học
          </Typography>
          {isLoading ? (
            <Box>
              <SekeletonUI />
            </Box>
          ) : (
            <Formik
              initialValues={{
                name: `${article?.name}`,
                type: `${article?.type}`,
                publicDate: dayjs(article?.publicDate),
                link: `${article?.link}`,
                author: `${article?.author}`,
                authorNumber: `${article?.authorNumber}`,
              }}
              validationSchema={validateSchemaArticle}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box width={'100%'}>
                      <CustomTextField
                        label='Tên bài báo'
                        placeholder='Vd: Nghiên cứu...'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        fullWidth
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                      <CustomTextField
                        label='Tên tác giả chính'
                        placeholder='Vd: Lê Minh Quang, Nguyễn Huy Hoàng'
                        name='author'
                        value={values.author}
                        onChange={handleChange}
                        fullWidth
                        error={touched.author && Boolean(errors.author)}
                        helperText={touched.author && errors.author}
                      />
                    </Box>
                    <Box display='flex' width='100%' gap={4}>
                      <Box mt={1} flex={1}>
                        <Typography variant='h6' fontWeight='bold' color='grey.700'>
                          Số Tác giả:
                        </Typography>
                        <CustomTextField
                          type='number'
                          sx={{ mt: 2 }}
                          placeholder='Số tác giả viết bài'
                          name='authorNumber'
                          value={values.authorNumber}
                          onChange={handleChange}
                          fullWidth
                          error={touched.authorNumber && Boolean(errors.authorNumber)}
                          helperText={touched.authorNumber && errors.authorNumber}
                        />
                      </Box>
                      <Box flex={1}>
                        <CustomTextField
                          label='Loại báo'
                          placeholder='Vd: báo khoa học'
                          name='type'
                          value={values.type}
                          onChange={handleChange}
                          fullWidth
                          error={touched.type && Boolean(errors.type)}
                          helperText={touched.type && errors.type}
                        />{' '}
                      </Box>
                      <Box>
                        <Calendar
                          label='Ngày công bố'
                          onChange={(date) => setFieldValue('publicDate', date)}
                          name='publicDate'
                          format='DD/MM/YYYY'
                          defaultValue={values.publicDate}
                        />
                      </Box>
                    </Box>
                    <Box my={2} width={'100%'}>
                      {!currentFile ? (
                        <Typography>
                          <Button
                            color='info'
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                              py: 10,
                              height: 100,
                              fontSize: 14,
                              border: '0.5px solid #bdbdbd',
                              textAlign: 'center',
                            }}
                            component='label'
                          >
                            Tên file đúng định dạng PDF
                            <br />
                            Bạn chưa tải lên file cập nhật . Nhấn để tải file
                            <VisuallyHiddenInput
                              type='file'
                              onChange={(e) => importFileToForm(e)}
                            />
                          </Button>
                        </Typography>
                      ) : (
                        <CardFile
                          fileName={fileName}
                          totalSize={totalSize}
                          valueLoading={valueLoading}
                        />
                      )}{' '}
                      {currentFile && (
                        <Typography
                          ml={4}
                          mt={12}
                          component={'span'}
                          variant='body1'
                          color='grey.600'
                        >
                          Đã có 1 file được tải lên. Vui lòng "Submit bài báo" để lưu thay đổi. Hoặc{' '}
                        </Typography>
                      )}
                      {currentFile && (
                        <Button
                          sx={{ display: 'inline-block' }}
                          color='error'
                          onClick={onClearFormFile}
                        >
                          Xóa file tải lên ?
                        </Button>
                      )}
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: 'grey.100',
                        borderRadius: 2,
                        padding: 3,
                        mt: 10,
                        px: 10,
                        py: 6,
                        width: '100%',
                      }}
                    >
                      <Typography
                        variant='body1'
                        color='error'
                        fontWeight='bold'
                        sx={{
                          mb: 2,
                          textDecoration: 'underline',
                        }}
                      >
                        Lưu ý*:
                      </Typography>
                      <Typography variant='body2' color='text.primary' sx={{ mb: 1 }}>
                        - Bài báo phải thuộc lĩnh vực khoa công nghệ thông tin. Nếu không, bài báo
                        sẽ không được tính điểm.
                      </Typography>
                    </Box>
                    <Box width={'100%'} mt={10}>
                      <Button
                        sx={{ width: 150, fontSize: 14, float: 'right' }}
                        variant='contained'
                        color='success'
                        type='submit'
                      >
                        Submit bài báo
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          )}
        </Box>
      </Paper>
    </Modal>
  );
}

export default UpdateArticleModal;
