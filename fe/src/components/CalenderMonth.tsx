import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday'
import { CalenderDay } from './CalenderDay';
import Grid from '@mui/material/Unstable_Grid2';
import { AspectRatio } from '@mui/joy';
import { Schedule } from '../models';

dayjs.extend(weekday);

export const CalenderMonth = (props: { month: Dayjs, data: Schedule | null}) => {
  const month = props.month.startOf('month');
  const data = props.data;
  // 表示する日付の配列を作成
  const numDays = Math.ceil((month.daysInMonth() + month.weekday()) / 7) * 7;
  const startDate = month.startOf('month').subtract(month.weekday(), 'day');
  const daysArray = Array.from({length: numDays}, (_, i) => startDate.add(i, 'day'));
  return (
    <Grid container spacing={0} justifyContent="space-between">
      {
        daysArray.map((date, index) => {
          return (
            <AspectRatio sx={{width : 'calc(100% / 7)'}} ratio={1}>
              <Grid xs={1}>
                <CalenderDay key={index} date={date} status={null}/>
              </Grid>
            </AspectRatio>
          );
        })
      }
    </Grid>
  );
}