import { Calendar, ConfigProvider } from "antd";
import { Schedule } from "../models";
import { DateRange } from "../models";
import { Dayjs } from "dayjs";
import jaJP from 'antd/lib/locale/ja_JP';
import "../styles/RegisterCalendar.css"
import { Box } from "@mui/material";

export const RegisterCalendar = (props: { data: Schedule[], range: DateRange, setDataById: (id: number) => void}) => {
  const data = props.data;
  const range = props.range;
  const setDataById = props.setDataById;


  const dateCellRender = (value: Dayjs) => {
    return (
      <Box>
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
        />
      </ConfigProvider>
    </>
  );
};