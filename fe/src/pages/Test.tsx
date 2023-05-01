import { Container } from "@mui/material";
import { CalenderMonth } from "../components";
import dayjs from 'dayjs';
import { DateRange } from "../models";

// 仮データ
const range : DateRange = {
  start: dayjs('2023-05-07'),
  end: dayjs('2023-05-21'),
};

export const Test = () => {
  return (
    <>
      <Container>
        <div>Test</div>
        <CalenderMonth month={dayjs().startOf('month')} data={null} range={range}/>
      </Container>
    </>
  );
}