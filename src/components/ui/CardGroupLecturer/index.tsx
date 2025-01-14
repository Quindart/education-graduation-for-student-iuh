import { checktTypeGroupLecturer } from '@/utils/validations/groupLecturer.validation';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import dayjs from 'dayjs';

function CardGroupLecturer(props: any) {
  const { group } = props;
  return (
    <Card
      sx={{
        border: '1px solid #e7e5e5',
        minHeight: 200,
        flex: 1,
      }}
      elevation={0}
    >
      <CardMedia
        component='img'
        alt='green iguana'
        height={75}
        sx={{
          objectFit: 'contain',
        }}
        image='/images/performance.png'
      />
      <CardContent>
        <Typography
          gutterBottom
          variant='h5'
          textTransform={'uppercase'}
          color='primary.main'
          mb={4}
          fontWeight={600}
          component='div'
        >
          {checktTypeGroupLecturer(group.type.toLowerCase())}
        </Typography>
        <Typography variant='h6' fontWeight={'bold'} color=''>
          Giảng viên chấm điểm
        </Typography>
        {group?.members.map((mem: any, index: number) => (
          <Box mx={2} my={4}>
            <Typography variant='h6' color='grey.800'>
              {mem.fullName} {' - '}
              <Typography variant='h6' component={'i'} color='grey.600'>
                {mem.comment ? mem.comment : 'Chưa có nhận xét'}
              </Typography>
            </Typography>
          </Box>
        ))}

        <Box sx={{ mb: 4 }}>
          <Typography variant='h6' fontWeight={'bold'}>
            Thông tin chi tiết
          </Typography>
          <Box mx={4}>
            <Typography
              mt={2}
              mb={2}
              display={'block'}
              fontWeight={'500'}
              color='primary.main'
              fontSize={14}
            >
              Địa điểm - {group.location}
            </Typography>
            <Typography
              mb={2}
              display={'block'}
              fontWeight={'500'}
              color='primary.main'
              fontSize={14}
            >
              Thời gian bắt đầu - {dayjs(group?.startDate).format('DD/MM/YYYY hh:mm:ss A')}
            </Typography>
            <Typography
              mb={2}
              display={'block'}
              fontWeight={'500'}
              color='primary.main'
              fontSize={14}
            >
              Thời gian kết thúc - {dayjs(group?.endDate).format('DD/MM/YYYY hh:mm:ss A')}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CardGroupLecturer;
