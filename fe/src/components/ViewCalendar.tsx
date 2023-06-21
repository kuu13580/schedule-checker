import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { UserScheduleData, DateRange, EventScheduleData, Schedule } from "../models";
import { Dayjs } from "dayjs";
import jaJP from 'antd/lib/locale/ja_JP';
import "../styles/RegisterCalendar.css"
import { Calendar, ConfigProvider } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ViewCalendar = (props: {dateRange: DateRange, func: (statusArr: number[]) => string, password: string}) => {
  const { eventId, hash } = useParams<{eventId: string, hash: string}>();
  const dateRange = props.dateRange;
  const func = props.func;
  const password = props.password;
  const [selectedValue, setSelectedValue] = useState<Dayjs>(dayjs());
  const [data, setData] = useState<EventScheduleData[]>([]);

  useEffect(() => {
    setSelectedValue(dateRange.start);
    axios.post(`${process.env.REACT_APP_API_URL}/schedules/all/${eventId}/${hash}`, { password: password })
      .then((res) => {
        const tmpData = res.data.map((d: any) => {
          return {
            userId: d['user_id'],
            schedules: d['schedules'].map((s: any) => {
              return {
                date: dayjs(s['date']),
                status: s['status']
              } as Schedule;
            })
          } as UserScheduleData;
        });
        setData(convertData(tmpData));
      })
      .catch((err) => {
        console.log(err);
      }
    );
  }, [dateRange]);

  const dateCellRender = (value: Dayjs) => {
    const bgColor = data.find((d) => d.date.isSame(value)) ? func(data.find((d) => d.date.isSame(value))?.statusWeight || []): "gray";
    return (
      <Box
        sx={{
          width: "100%",
          height: "90%",
          backgroundColor: bgColor
        }}
      >
      </Box>
    );
  };

  const convertData = (data: UserScheduleData[]): EventScheduleData[] => {
    // dateRangeの範囲のデータを作成
    const numDays = dateRange.end.diff(dateRange.start, 'day') + 1;
    const dateArr = Array.from({ length: numDays }, (_, i) => {
      return dateRange.start.add(i, 'day');
      });
    return dateArr.map((date) => {
      const status: string[] = data.map((i) => {
        return i.schedules.find((j) => j.date.isSame(date))?.status || '';
      });
      const statusWeight: number[] = status.map((s) => {
        if (s === "available") return 0;
        if (s === "potential") return 1;
        if (s === "unavailable") return 2;
        return 0;
      });
      return {
        date: date,
        status: status,
        statusWeight: statusWeight,
      } as EventScheduleData;
    });
  }

  return (
    <>
      <ConfigProvider locale={jaJP}>
        <Calendar
          cellRender={dateCellRender}
          validRange={[dateRange.start, dateRange.end]}
          value={selectedValue}
          onSelect={(date: Dayjs) => {
            setSelectedValue(date);
          }}
        />
      </ConfigProvider>
    </>
  )
}
