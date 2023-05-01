import { Box, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';

export const CalenderDay = (props : {date : Dayjs, status : string | null}) => {
  const date = props.date;
  const status = props.status;
  const day = date.format('D');
  const bgColor = 
    status === 'busy' ? 'red' 
    : status === 'danger' ? 'yellow'
    : 'white';
  return (
    <Box sx={{width : 'calc(90svw / 7)', height : 'calc(90svw / 7)', bgcolor: bgColor}}>
      <Typography>{ day }</Typography>
    </Box>
  );
}
