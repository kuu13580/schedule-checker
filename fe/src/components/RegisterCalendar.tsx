import { Calendar, ConfigProvider } from "antd";
import { Schedule } from "../models";
import { DateRange } from "../models";
import { Dayjs } from "dayjs";
import jaJP from 'antd/lib/locale/ja_JP';
import "../styles/RegisterCalendar.css"
import { Box } from "@mui/material";

export const RegisterCalendar = (props: { data: Schedule[], range: DateRange, setStatusByDate: (date: Dayjs) => void}) => {
  const data = props.data;
  const range = props.range;
  const setStatusByDate = props.setStatusByDate;


  const dateCellRender = (value: Dayjs) => {
    return (
      <Box>
        {data.find((d) => d.date.isSame(value))?.status || ""}
      </Box>
    );
  };

  
  return (
    <>
      <ConfigProvider locale={jaJP}>
        <Calendar
          cellRender={dateCellRender}
          validRange={[range.start, range.end]}
          defaultValue={range.start}
          onSelect={(date: Dayjs) => setStatusByDate(date)}
        />
      </ConfigProvider>
    </>
  );
};