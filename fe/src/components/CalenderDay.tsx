import { Box, Typography, Paper } from '@mui/material';
import { Dayjs } from 'dayjs';

export const CalenderDay = (props: { date: Dayjs, status: string | null }) => {
  const date = props.date;
  const status = props.status;
  const day = date.format('D');
  const Holidays = require('japanese-holidays');
  const bgColor =
    status === 'busy' ? 'red'
    : status === 'danger' ? 'yellow'
    : 'white';
  const dateTextColor = 
    date.weekday() === 0 || Holidays.isHoliday(date.toDate()) ? 'red':
    date.weekday() === 6 ? 'blue':
    'black';
  return (
    <Box 
      sx={{width : '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',}}>
      <Paper sx={{ bgcolor: bgColor, width : '90%', height: '90%'}}>
        <Typography sx={{ color: dateTextColor }}>{day}</Typography>
      </Paper>
    </Box>
  );
}
