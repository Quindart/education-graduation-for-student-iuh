import TitleManager from '@/components/ui/Title';
import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useGroupStudent from '@/hook/api/useGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '@/components/ui/CustomTextField';
import CardGroupLecturer from '@/components/ui/CardGroupLecturer';
function MyGroupLecturerDesktop() {
  const { HandleGetMyGroupStudent, OnSubmitReviewDocument } = useGroupStudent();
  const { data, isLoading, refetch } = HandleGetMyGroupStudent();
  const { mutate: submitLink } = OnSubmitReviewDocument();
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (data?.group?.info?.link) {
      setLink(data.group?.info?.link);
    }
  }, [data]);

  const handleSubmitLink = (groupId) => {
    submitLink({ groupId, link });
  };
  return (
    <Paper sx={{ my: 2, px: 10, py: 6, borderRadius: 2 }} elevation={0}>
      <TitleManager
        textTransform={'uppercase'}
        fontWeight={'bold'}
        variant='h6'
        icon='material-symbols:groups-2'
      >
        Danh sách Nhóm giảng viên chấm điểm đề tài của tôi
      </TitleManager>

      <Box width={'100%'} minHeight={500}>
        {' '}
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <>
            {!data ? (
              <Box
                mx={'auto'}
                display={'flex'}
                flexDirection={'column'}
                alignContent={'center'}
                justifyContent={'center'}
                textAlign={'center'}
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
                <Typography variant='h3' sx={{ mt: 2 }}>
                  Bạn Chưa có Nhóm
                </Typography>
                <Box>
                  <Button variant='contained' onClick={() => navigate('/group-students')}>
                    <Icon icon='fluent-mdl2:leave' />
                    Đăng ký nhóm ngay
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Box minHeight={400} flex={1} px={4} py={2}>
                  <Box mt={4} display={'flex'} flexDirection={'column'}>
                    <Box sx={{ display: 'flex', gap: 10, py: 10, flexWrap: 'wrap' }}>
                      {data?.group?.groupLecturers?.map((group) => (
                        <CardGroupLecturer group={group} />
                      ))}
                    </Box>
                    <Box
                      mr={2}
                      alignSelf={'flex-end'}
                      display={'flex'}
                      width={'100%'}
                      justifyContent={'space-between'}
                    >
                      <Box sx={{ display: 'flex', gap: 6, width: '100%' }}>
                        <Box sx={{ flex: 1 }}>
                          <CustomTextField
                            size='medium'
                            label='Nộp link tài liệu tại đây'
                            value={link}
                            defaultValue={data.group?.info?.link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder='Nhập link tài liệu báo cáo'
                          />
                        </Box>
                        <Button
                          onClick={() => handleSubmitLink(data.group.info.id)}
                          size='large'
                          sx={{ width: 120, height: 48, mt: 15 }}
                          color='success'
                          variant='contained'
                        >
                          Nộp tài liệu
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Typography variant='h6' color='error.dark'>
                  <span style={{ color: 'red', fontWeight: 'bold' }}>LƯU Ý:</span> Link tài liệu
                  google drive phải được bật chế độ{' '}
                  <span style={{ color: 'red', fontWeight: 'bold' }}>"CHIA SẺ CÔNG KHAI"</span>
                  {'. '}
                  Mỗi nhóm cần nộp link tài liệu trước thời gian báo cáo khoảng 1 ngày. Nội dung bao
                  gồm:
                  <i>
                    1. File chứa link source code; 2. Video clip giới thiệu hệ thống (khoảng 5 -10
                    phút); 3. File tài liệu khóa luận; 4. File powerpoint slides báo cáo.
                  </i>
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    {' '}
                    Giảng viên có thể sẽ sử dụng các nội dung trong link này để đánh giá và chấm
                    điểm.
                  </span>
                </Typography>
              </>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
}

export default MyGroupLecturerDesktop;
