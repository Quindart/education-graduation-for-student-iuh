import TitleManager from '@/components/ui/Title';
import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StudentCard from './StudentCard';
import useGroupStudent from '@/hook/api/useGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { Icon } from '@iconify/react';
import ExitGroupModal from '@/components/page/GroupStudent/Modal/ExitGroupModal';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/userStore';
import useTermStore from '@/store/termStore';
import { ENUM_STATUS_OF_DATE_TERM } from '@/utils/validations/term.validation';

function MyGroupStudentDesktop() {
  const { HandleGetMyGroupStudent, OnSubmitReviewDocument } = useGroupStudent();
  const { data, isLoading, refetch } = HandleGetMyGroupStudent();
  const { mutate: submitLink } = OnSubmitReviewDocument();
  const [openLeaveModal, setOpenEditLeaveModal] = useState({ groupId: '', isOpen: false });
  const [link, setLink] = useState('');
  const handleCloseLeaveModal = () => {
    setOpenEditLeaveModal({ ...openLeaveModal, isOpen: false });
  };
  const handleOpenLeaveModal = (groupId: string) => {
    setOpenEditLeaveModal({ groupId, isOpen: true });
  };
  const { me } = useUserStore();
  const navigate = useNavigate();
  const { partOfTerm } = useTermStore();

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
    <Paper sx={{ px: 10, py: 4, borderRadius: 2 }} elevation={0}>
      <TitleManager fontWeight={'bold'} variant='h6' textTransform={'uppercase'} icon='mingcute:group-3-fill'>
        Nhóm sinh viên {data?.group?.info.name}
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
                    <Box width={'full'}>
                      {data?.group?.members.map((mem: any, index: number) => (
                        <StudentCard
                          key={index}
                          groupId={data.group.info.id}
                          name={mem.student.fullName}
                          mssv={mem.student.username}
                          email={mem.student.email}
                          phone={mem.student.phone}
                          gender={mem.student.gender}
                          studentId={mem.student_id}
                          isAdmin={mem.isAdmin}
                          isMe={mem.student_id === me?.id}
                          index={index + 1}
                        />
                      ))}
                    </Box>
                    <Box
                      mt={10}
                      mr={2}
                      alignSelf={'flex-end'}
                      display={'flex'}
                      width={'100%'}
                      justifyContent={'end'}
                    >
                      <Button
                        onClick={() => handleOpenLeaveModal(data?.group?.info.id)}
                        variant='contained'
                        color='primary'
                        sx={{ width: 140, height: 50 }}
                        size='large'
                        disabled={
                          partOfTerm.ChooseGroup?.status !== ENUM_STATUS_OF_DATE_TERM.ACTIVE
                        }
                      >
                        <Icon icon='fluent-mdl2:leave-user' />
                        Rời nhóm
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <ExitGroupModal
                  open={openLeaveModal.isOpen}
                  groupId={openLeaveModal.groupId}
                  onClose={handleCloseLeaveModal}
                />
              </>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
}

export default MyGroupStudentDesktop;
