import { Box, Typography, Paper } from '@mui/material';
import { Dayjs } from 'dayjs';
import { DateRange } from '../models';

export const CalenderDay = (props: { date: Dayjs, status: string, range: DateRange }) => {
  const date = props.date;
  const status = props.status;
  const range = props.range;
  const day = date.format('D');
  const Holidays = require('japanese-holidays');
  const isEnable = date.isAfter(range.start) && date.isBefore(range.end.add(1, 'day'));
  const bgColor =
    !isEnable ? 'gray'
    : status === 'busy' ? 'red'
    : status === 'danger' ? 'yellow'
    : 'white';
  const dateTextColor = 
    date.weekday() === 0 || Holidays.isHoliday(date.toDate()) ? 'red':
    date.weekday() === 6 ? 'blue':
    'black';
  const dateTextOpacity = !isEnable ? 0.5 : 1;
  return (
    <Box 
      sx={{width : '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',}}
    >
      <Typography sx={{ color: dateTextColor, opacity: dateTextOpacity , fontSize: { xs: '1rem', sm: '2rem' }}}>{day}</Typography>
      <Paper sx={[{ bgcolor: bgColor, width : '90%', height: '90%',}, 
        isEnable && {'&:hover': {bgcolor : 'silver'}}]}>
      </Paper>
    </Box>
  );
}
