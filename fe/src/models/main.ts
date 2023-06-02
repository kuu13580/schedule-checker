import { Dayjs } from "dayjs";

export type Schedule = {
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

export type EventForm = {
  name: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  ownerName: string;
  password: string;
  passwordConfirm: string;
}