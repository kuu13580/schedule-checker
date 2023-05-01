import { Dayjs } from "dayjs";

export type Schedule = {
  date: Dayjs;
  status: string;
}

export type DateRange = {
  start: Dayjs;
  end: Dayjs;
}