import TitleManager from '@/components/ui/Title';
import useTranscript from '@/hook/api/useTranscript';
import useTermStore from '@/store/termStore';
import {
  checkColorStatusPartTerm,
  ENUM_STATUS_OF_DATE_TERM,
} from '@/utils/validations/term.validation';
import { Box, Paper, Typography } from '@mui/material';

export enum ENUM_SCORE {
  ADVISOR = 'ADVISOR',
  REVIEWER = 'REVIEWER',
  REPORT = 'REPORT',
}

function ScorePageDesktop() {
  const { HandleGetTranscriptSummary } = useTranscript();
  const { transcript } = HandleGetTranscriptSummary();
  const partOfTerm = useTermStore((state) => state.partOfTerm);

  return (
    <>
      <Paper sx={{ px: 20, py: 10, my: 20, mx: 10 }}>
        <TitleManager variant='h4' icon='ph:exam-duotone' textTransform={'uppercase'} mb={4}>
          Bảng điểm của tôi
        </TitleManager>
        {partOfTerm.PublicResult?.status === ENUM_STATUS_OF_DATE_TERM.INACTIVE ||
        partOfTerm.PublicResult?.status === ENUM_STATUS_OF_DATE_TERM.EXPIRED ? (
          <Box>
            {' '}
            <Typography
              mt={2}
              fontWeight={400}
              variant='body1'
              color={checkColorStatusPartTerm(partOfTerm?.PublicResult?.status)}
            >
              Công bố kết quả điểm khóa luận của sinh viên - {partOfTerm.PublicResult?.mess}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ px: 10, my: 10, display: 'flex', gap: 10, width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant='h5' fontWeight={'bold'} lineHeight={2} color={'#000'}>
                Điểm quá trình
              </Typography>
              {transcript?.transcripts && transcript?.transcripts.length > 0 ? (
                transcript?.transcripts.map((item: any, index: number) => (
                  <Box sx={{ mx: 10, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5' fontWeight={'500'} lineHeight={2}>
                      GV{' '}
                      {item.type === 'ADVISOR'
                        ? 'Hướng dẫn'
                        : item.type === 'REVIEWER'
                          ? 'Phản biện'
                          : 'Hội đồng/Poster'}
                      {' - '}
                      <span style={{ fontWeight: 500, fontStyle: 'italic' }}>{item.fullName}</span>
                    </Typography>

                    <Typography variant='h6' fontWeight={500} lineHeight={2} color={'#FF0000'}>
                      {item.avgScore}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant='h5' fontWeight={500} lineHeight={2} textAlign={'center'}>
                  Hiện tại chưa có điểm
                </Typography>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mr: 10 }}>
                <Typography variant='h5' fontWeight={'bold'} lineHeight={2} color={'#000'}>
                  Điểm cộng
                </Typography>
                <Typography variant='h6' fontWeight={500} lineHeight={2} color={'#FF0000'}>
                  {transcript?.bonusScore}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </>
  );
}

export default ScorePageDesktop;
