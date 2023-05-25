import { Button, Container } from "@mui/material";
import { RegisterCalendar, StatusRadio } from "../components";
import { Dayjs } from "dayjs";
import dayjs from 'dayjs';
import { DateRange } from "../models";
import { useEffect, useState } from "react";
import { Schedule } from "../models";

// 仮データ
const range: DateRange = {
  start: dayjs('2023-05-06'),
  end: dayjs('2023-06-15'),
};

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

export const Register = () => {
  const [data, setData] = useState<Schedule[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('danger');

  // 初回データセット
  useEffect(() => {
    setData(initData(range, testData));
  }, []);

  const sortData = (data: Schedule[]) => {
    return data.sort((a, b) => {
      if (a.date.isAfter(b.date)) return 1;
      return -1;
    });
  }

  // rangeに対応するデータを初期化
  const initData = (range: DateRange, data: Schedule[]) => {
    const numDays = range.end.diff(range.start, 'day') + 1;
    return Array.from({ length: numDays }, (_, i) => {
      const status = data.find((d) => d.date.isSame(range.start.add(i, 'day')))?.status || 'none';
      return {
        id: i,
        date: range.start.add(i, 'day'),
        status: status
      } as Schedule;
    });
  }

  // idに対応するデータを更新
  const setStatusByDate = (date: Dayjs) => {
    setData((prev) => {
      return prev.map((d) => {
        if (d.date.isSame(date)) {
          return { ...d, status: selectedStatus };
        }
        return d;
      });
    });
  };

  return (
    <>
      <Container maxWidth='md'>
        <StatusRadio selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        <RegisterCalendar
          data={data}
          range={range}
          setStatusByDate={setStatusByDate}
        />
        <Button variant="contained" color="primary">保存</Button>
      </Container>
    </>
  );
}