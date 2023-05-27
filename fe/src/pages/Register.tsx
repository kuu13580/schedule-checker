import { Button, Container } from "@mui/material";
import { LoadingBackdrop, RegisterCalendar, StatusRadio, PasswordBox } from "../components";
import { Dayjs } from "dayjs";
import dayjs from 'dayjs';
import { DateRange } from "../models";
import { useEffect, useState } from "react";
import { Schedule } from "../models";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

// 仮データ

const userId = 1;
const pass = '1234'

export const Register = () => {
  // パスパラメータ取得
  const { eventId, hash } = useParams<{eventId: string, hash: string}>();

  const [messageApi, contextHolder] = message.useMessage();
  const [eventName, setEventName] = useState<string>('');
  const [data, setData] = useState<Schedule[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('unavailable');
  const [dateRange, setDateRange] = useState<DateRange>({start: dayjs(), end: dayjs()});
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

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

  // 初回ローカルデータセット
  useEffect(() => {
    setShowLoading(true);
    let tmpDateRange: DateRange;
    // イベント全般のデータを取得
    axios.get(`${process.env.REACT_APP_API_URL}/events/${eventId}/${hash}`)
    .then((res) => {
      setEventName(res.data['name']);
      tmpDateRange = {
        start: dayjs(res.data['start_date']),
        end: dayjs(res.data['end_date']),
      };
      setDateRange(tmpDateRange);
      return axios.post(`${process.env.REACT_APP_API_URL}/schedules/${userId}/${hash}`, { password: pass });
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
    axios.post(`${process.env.REACT_APP_API_URL}/schedules/${userId}/${hash}/update`, { password: pass, scheduleArray: formatData })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        error('データの保存に失敗しました');
      })
      .finally(() => {
        setShowLoading(false);
        success('データを保存しました');
      });
  }

  return (
    <>
      {contextHolder}
      <Container maxWidth='md'>
        {!showContent && <PasswordBox />}
        {showContent &&
        <>
          <StatusRadio selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
          <RegisterCalendar
            data={data}
            range={dateRange}
            setStatusByDate={setStatusByDate}
          />
          <Button variant="contained" color="primary" onClick={saveData}>保存</Button>
          <LoadingBackdrop isShow={showLoading} />
        </>
        }
      </Container>
    </>
  );
}
