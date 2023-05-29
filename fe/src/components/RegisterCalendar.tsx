import { Calendar, ConfigProvider, message } from "antd";
import { Schedule, DateRange } from "../models";
import { Dayjs } from "dayjs";
import jaJP from 'antd/lib/locale/ja_JP';
import "../styles/RegisterCalendar.css"
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DeleteUserButton, LoadingBackdrop, StatusRadio } from "./";

export const RegisterCalendar = (props: {userId: string, password: string}) => {
  const password = props.password;
  const userId = props.userId;

  // パスパラメータ取得
  const { eventId, hash } = useParams<{eventId: string, hash: string}>();

  // const [eventName, setEventName] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<Dayjs>(dayjs());
  const [data, setData] = useState<Schedule[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('unavailable');
  const [dateRange, setDateRange] = useState<DateRange>({start: dayjs(), end: dayjs()});
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

    // メッセージ表示
    const error = (msg: string) => {
      messageApi.open({
        type: 'error',
        content: msg,
        duration: 5,
      });
    }
    const success = (msg: string) => {
      messageApi.open({
        type: 'success',
        content: msg,
        duration: 2,
      });
    }

  useEffect(() => {
    setSelectedValue(dateRange.start);
  }, [dateRange]);

  // 初回ローカルデータセット
  useEffect(() => {
    setShowLoading(true);
    let tmpDateRange: DateRange;
    // イベント全般のデータを取得
    axios.get(`${process.env.REACT_APP_API_URL}/events/${eventId}/${hash}`)
    .then((res) => {
      // setEventName(res.data['name']);
      tmpDateRange = {
        start: dayjs(res.data['start_date']),
        end: dayjs(res.data['end_date']),
      };
      setDateRange(tmpDateRange);
      return axios.post(`${process.env.REACT_APP_API_URL}/schedules/${userId}/${hash}`, { password: password });
    })
    // ユーザーのスケジュールを取得
    .then((res) => {
      setData(initData(tmpDateRange,
        res.data.map((d: any) => {
          return {
            date: dayjs(d['date']),
            status: d['status']
          } as Schedule;
        })));
    })
    .catch((err) => {
      error('データの取得に失敗しました');
    })
    .finally(() => {
      setShowLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  // rangeに対応するローカルデータを初期化
  const initData = (range: DateRange, data: Schedule[]) => {
    const numDays = range.end.diff(range.start, 'day') + 1;
    return Array.from({ length: numDays }, (_, i) => {
      const status = data.find((d) => d.date.isSame(range.start.add(i, 'day')))?.status || 'available';
      return {
        id: i,
        date: range.start.add(i, 'day'),
        status: status
      } as Schedule;
    });
  }

  // idに対応するローカルデータを更新
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

  // データを送信
  const saveData = () => {
    setShowLoading(true);
    const formatData = data.map((d) => {
      return {
        ...d,
        date: d.date.format('YYYY-MM-DD'),
      };
    });
    axios.post(`${process.env.REACT_APP_API_URL}/schedules/${userId}/${hash}/update`, { password: password, scheduleArray: formatData })
      .then((res) => {
      })
      .catch((err) => {
        error('データの保存に失敗しました');
      })
      .finally(() => {
        setShowLoading(false);
        success('データを保存しました');
      });
  }

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
      {contextHolder}
      <StatusRadio selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
      <ConfigProvider locale={jaJP}>
        <Calendar
          cellRender={dateCellRender}
          validRange={[dateRange.start, dateRange.end]}
          value={selectedValue}
          onSelect={(date: Dayjs) => {
            setStatusByDate(date);
            setSelectedValue(date);
          }}
        />
      </ConfigProvider>
      <Button variant="contained" color="primary" onClick={saveData}>保存</Button>
      <LoadingBackdrop isShow={showLoading} />
      <DeleteUserButton userId={userId} password={password} />
    </>
  );
};
