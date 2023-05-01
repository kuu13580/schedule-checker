import { Dayjs } from "dayjs";

export type Schedule = {
  id?: number;
  date: Dayjs;
  status: string;
}

export type DateRange = {
  start: Dayjs;
  end: Dayjs;
}

export type User = {
  id: number;
  name: string;
}