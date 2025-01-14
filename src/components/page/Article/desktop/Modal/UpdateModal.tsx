import React, { useEffect, useState } from 'react';
import { Box, Button, InputLabel, Paper, Typography } from '@mui/material';
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
        <Box>
          <Typography
            mb={10}
            variant='h6'
            textTransform='uppercase'
            fontWeight='bold'
            color='primary.main'
          >
            Cập nhật bài báo khoa học
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
                      <Box>
                        <CustomTextField
                          label='Tên bài báo'
                          placeholder='VD: Hệ thống quản lý...'
                          name='name'
                          value={values.name}
                          onChange={handleChange}
                          fullWidth
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          required
                        />
                      </Box>
                      <CustomTextField
                        label='Tên các tác giả chính'
                        placeholder='VD: Lê Minh Quang, Nguyễn Huy Hoàng'
                        name='author'
                        value={values.author}
                        onChange={handleChange}
                        fullWidth
                        error={touched.author && Boolean(errors.author)}
                        helperText={touched.author && errors.author}
                        required
                      />
                    </Box>
                    <Box width={'100%'}>
                      <CustomTextField
                        label='Loại bài báo'
                        placeholder='VD: Bài báo khoa học trẻ'
                        name='type'
                        value={values.type}
                        onChange={handleChange}
                        fullWidth
                        error={touched.type && Boolean(errors.type)}
                        helperText={touched.type && errors.type}
                        required
                      />
                    </Box>
                    <Box display='flex' width='100%' gap={4}>
                      <Box mt={1} flex={1}>
                        <CustomTextField
                          label='Số tác giả'
                          type='number'
                          placeholder='Số tác giả'
                          name='authorNumber'
                          value={values.authorNumber}
                          onChange={handleChange}
                          fullWidth
                          error={touched.authorNumber && Boolean(errors.authorNumber)}
                          helperText={touched.authorNumber && errors.authorNumber}
                          required
                        />
                      </Box>
                      <Box flex={1}>
                        <InputLabel
                          htmlFor='publicDate'
                          sx={{ mb: 4, color: 'grey.900', fontSize: 14, fontWeight: 600 }}
                        >
                          Ngày công bố<span style={{ color: 'red', marginLeft: 2 }}>*</span>
                        </InputLabel>
                        <Calendar
                          onChange={(date) => setFieldValue('publicDate', date)}
                          name='publicDate'
                          format='DD/MM/YYYY'
                          defaultValue={values.publicDate}
                          id='publicDate'
                        />
                      </Box>
                    </Box>
                    <Box my={1} width={'100%'}>
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
                              fontSize: 14,
                              border: '0.5px solid #bdbdbd',
                            }}
                            component='label'
                          >
                            Tải file lên (.PDF) kích thước tối đa 10MB
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
                      )}
                      {currentFile && (
                        <Typography
                          ml={4}
                          mt={12}
                          component={'span'}
                          variant='body1'
                          color='grey.600'
                        >
                          Đã có 1 file được tải lên. Vui lòng nhấn "Cập nhật" để lưu thay đổi. Hoặc
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
                        variant='h6'
                        color='error'
                        fontWeight='bold'
                        sx={{
                          mb: 2,
                          textDecoration: 'underline',
                        }}
                      >
                        Lưu ý:
                      </Typography>
                      <Typography variant='h6' color='text.primary' sx={{ mb: 1 }}>
                        - Bài báo phải thuộc lĩnh vực khoa Công nghệ thông tin. Nếu không, bài báo
                        sẽ không được tính điểm.
                      </Typography>
                    </Box>
                    <Box width={'100%'} mt={10}>
                      <Button
                        sx={{ width: 100, fontSize: 14, float: 'right' }}
                        variant='contained'
                        color='success'
                        type='submit'
                      >
                        Cập nhật
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
