import { Calendar, ConfigProvider } from "antd";
import { Schedule, DateRange } from "../models";
import { Dayjs } from "dayjs";
import jaJP from 'antd/lib/locale/ja_JP';
import "../styles/RegisterCalendar.css?ver=1.0.0"
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DeleteUserButton, LoadingBackdrop, StatusRadio } from "./";

export const RegisterCalendar = (props: {userId: string, password: string, dateRange: DateRange, topBanner: (type: "error" | "success", msg: string) => void}) => {
  const password = props.password;
  const userId = props.userId;
  const dateRange = props.dateRange;
  const topBanner = props.topBanner;

  // パスパラメータ取得
  const { hash } = useParams<{hash: string}>();

  // const [eventName, setEventName] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<Dayjs>(dayjs());
  const [data, setData] = useState<Schedule[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('unavailable');
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [textMessage, setTextMessage] = useState<string>('');
  const [isChenged, setIsChenged] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => { if (isChenged) {e.preventDefault(); e.returnValue = 'check';} });
    // eslint-disable-next-line
    return () => {
      window.removeEventListener('beforeunload', (e) => { if (isChenged) {e.preventDefault(); e.returnValue = 'check';}
    }); }
  }, [isChenged]);

  useEffect(() => {
    setSelectedValue(dateRange.start);
  }, [dateRange]);

  // 初回ローカルデータセット
  useEffect(() => {
    setShowLoading(true);
    // ユーザーのスケジュールを取得
    axios.post(`${process.env.REACT_APP_API_URL}/schedules/${userId}/${hash}`, { password: password })
      .then((res) => {
        setData(initData(dateRange,
          res.data["schedules"].map((d: any) => {
            return {
              date: dayjs(d['date']),
              status: d['status']
            } as Schedule;
          })));
        setTextMessage(res.data["message"]);
      })
      .catch((err) => {
        topBanner("error", 'データの取得に失敗しました');
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
    setIsChenged(true);
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
    axios.post(`${process.env.REACT_APP_API_URL}/schedules/${userId}/${hash}/update`, { password: password, scheduleArray: formatData, message: textMessage })
      .then((res) => {
        topBanner("success", 'データを保存しました');
      })
      .catch((err) => {
        topBanner("error", 'データの保存に失敗しました');
      })
      .finally(() => {
        setIsChenged(false);
        setShowLoading(false);
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
      <StatusRadio selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
      <ConfigProvider locale={jaJP} theme={{ token: {fontSize: 20}}}>
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
      <TextField
        id="outlined-multiline-static"
        label="備考"
        multiline
        rows={4}
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        variant="outlined"
        sx={{ my: 2 }}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={saveData}>保存</Button>
      <LoadingBackdrop isShow={showLoading} />
      <DeleteUserButton userId={userId} password={password} topBanner={topBanner} />
    </>
  );
};
