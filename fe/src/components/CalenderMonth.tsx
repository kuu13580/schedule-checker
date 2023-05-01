import dayjs, { Dayjs } from 'dayjs';
import { CalenderDay } from './CalenderDay';
import Grid from '@mui/material/Unstable_Grid2';
import { AspectRatio } from '@mui/joy';
import { DateRange, Schedule } from '../models';

export const CalenderMonth = (props: { month: Dayjs, data: Schedule | null, range: DateRange}) => {
  const month = props.month.startOf('month');
  const data = props.data;
  const range = props.range;
  // 表示する日付の配列を作成
  const numDays = Math.ceil((month.daysInMonth() + month.weekday()) / 7) * 7;
  const startDate = month.startOf('month').subtract(month.weekday(), 'day');
  const daysArray = Array.from({length: numDays}, (_, i) => startDate.add(i, 'day'));
  return (
    <Grid container spacing={0} justifyContent="space-between">
      {
        daysArray.map((date, index) => {
          return (
            <AspectRatio key={index} sx={{width : 'calc(100% / 7)'}} ratio={1}>
              <Grid xs={1}>
                <CalenderDay 
                  date={date} 
                  status={null} 
                  range={range}
                />
              </Grid>
            </AspectRatio>
          );
        })
      }
    </Grid>
  );
}