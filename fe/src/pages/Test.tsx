import { Button, Container, Radio } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CalenderMonth, StatusRadio } from "../components";
import dayjs from 'dayjs';
import { DateRange } from "../models";
import ja from 'dayjs/locale/ja';
import { useEffect, useState } from "react";
import { Schedule } from "../models";

// 仮データ
const range: DateRange = {
  start: dayjs('2023-05-06'),
  end: dayjs('2023-06-15'),
};

export const Test = () => {
  const [data, setData] = useState<Schedule[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<dayjs.Dayjs>(range.start.startOf('month'));
  const [selectedStatus, setSelectedStatus] = useState<string>('danger');

  // 初回データセット
  // 仮データ
  const testData: Schedule[] = [
    { date: dayjs('2023-05-07'), status: 'busy' },
    { date: dayjs('2023-05-08'), status: 'danger' },
    { date: dayjs('2023-05-09'), status: '' },
    { date: dayjs('2023-05-10'), status: 'busy' },
    { date: dayjs('2023-05-11'), status: 'busy' },
    { date: dayjs('2023-06-02'), status: 'busy' },
    { date: dayjs('2023-06-06'), status: 'danger' },
    { date: dayjs('2023-06-12'), status: 'danger' },
  ];

  useEffect(() => {
    setData(initData(range, testData));
  }, []);

  const sortData = (data: Schedule[]) => {
    return data.sort((a, b) => {
      if (a.date.isAfter(b.date)) return 1;
      return -1;
    });
  }

  const initData = (range: DateRange, data: Schedule[]) => {
    const numDays = range.end.diff(range.start, 'day') + 1;
    return Array.from({length: numDays}, (_, i) => {
      const status = data.find((d) => d.date.isSame(range.start.add(i, 'day')))?.status || '';
      return {
        id: i,
        date: range.start.add(i, 'day'),
        status: status
      } as Schedule;
    });
  }

  // idに対応するデータを更新
  const setDataById = (id: number) => {
    if (id === -1) return;
    setData((prev) => {
      const newData = [...prev];
      newData[id].status = selectedStatus;
      return newData;
    });
  }

  return (
    <>
      <Container maxWidth='md'>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ja}>
          <DatePicker
            views={['month', 'year']}
            minDate={range.start.startOf('month')}
            maxDate={range.end.endOf('month')}
            value={selectedMonth}
            onChange={(date) => setSelectedMonth(dayjs(date))}
          />
        </LocalizationProvider>
        <StatusRadio selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        <CalenderMonth
          month={selectedMonth.startOf('month')}
          data={data}
          range={range}
          setDataById={setDataById}
        />
        <Button variant="contained" color="primary">保存</Button>
      </Container>
    </>
  );
}