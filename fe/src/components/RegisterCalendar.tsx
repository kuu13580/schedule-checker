import { Calendar, ConfigProvider } from "antd";
import { Schedule } from "../models";
import { DateRange } from "../models";
import { Dayjs } from "dayjs";
import jaJP from 'antd/lib/locale/ja_JP';
import "../styles/RegisterCalendar.css"
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const RegisterCalendar = (props: { data: Schedule[], range: DateRange, setStatusByDate: (date: Dayjs) => void}) => {
  const data = props.data;
  const range = props.range;
  const setStatusByDate = props.setStatusByDate;

  const [selectedValue, setSelectedValue] = useState<Dayjs>(dayjs());

  useEffect(() => {
    setSelectedValue(range.start);
  }, [range]);

  const dateCellRender = (value: Dayjs) => {
    const status = data.find((d) => d.date.isSame(value))?.status || "";
    const bgColor =
      status === 'unavailable' ? 'red'
    : status === 'potential' ? 'yellow'
    : status === 'available' ? 'green'
    : 'gray';
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


  return (
    <>
      <ConfigProvider locale={jaJP}>
        <Calendar
          cellRender={dateCellRender}
          validRange={[range.start, range.end]}
          value={selectedValue}
          onSelect={(date: Dayjs) => {
            setStatusByDate(date);
            setSelectedValue(date);
          }}
        />
      </ConfigProvider>
    </>
  );
};
