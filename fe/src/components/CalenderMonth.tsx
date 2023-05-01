import dayjs, { Dayjs } from 'dayjs';
import { CalenderDay } from './CalenderDay';
import Grid from '@mui/material/Unstable_Grid2';
import { AspectRatio } from '@mui/joy';
import { DateRange, Schedule } from '../models';

export const CalenderMonth = (props: { month: Dayjs, data: Schedule[], range: DateRange, setDataById: any}) => {
  const month = props.month.startOf('month');
  const data = props.data;
  const range = props.range;
  const setDataById = props.setDataById;

  // 表示する日付の配列を作成
  const numDays = Math.ceil((month.daysInMonth() + month.weekday()) / 7) * 7;
  const startDate = month.startOf('month').subtract(month.weekday(), 'day');
  const daysArray = Array.from({length: numDays}, (_, i) => startDate.add(i, 'day'));
  const statusArray = daysArray.map((date) => {
    const target = data.find((d) => d.date.isSame(date));
    return target ? target.status : '';
  });

  // 最初の日付に対応するidを取得
  const firstDateId = 
    daysArray[0].isBefore(range.start) ? daysArray[0].diff(range.start, 'day') :
    data.findIndex((d) => d.date.isSame(daysArray[0]));

  return (
    <Grid container spacing={0} justifyContent="space-between" sx={{ md: {px: 1} }}>
      {
        daysArray.map((date, index) => {
          return (
            <AspectRatio key={index} sx={{width : 'calc(100% / 7)'}} ratio={1}>
              <Grid xs={1}>
                <CalenderDay
                  id={Math.max(firstDateId + index, -1)}
                  date={date} 
                  status={statusArray[index]} 
                  range={range}
                  setDataById={setDataById}
                />
              </Grid>
            </AspectRatio>
          );
        })
      }
    </Grid>
  );
}