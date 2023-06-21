import { useParams } from "react-router-dom"
import { Header, ViewCalendar, LoadingBackdrop, OwnerPasswordBox } from "../components";
import { DateRange } from "../models";
import dayjs from "dayjs";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const OwnerView = () => {
  const { eventId, hash } = useParams<{eventId: string, hash: string}>();
  const [dateRange, setDateRange] = useState<DateRange>({start: dayjs(), end: dayjs()});
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showContent, setShowContent] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();
  const error = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
      duration: 5,
    });
  }


  // データ取得
  useEffect(() => {
    setShowLoading(true);
    let tmpDateRange: DateRange;
    // イベント全般のデータを取得
    axios.get(`${process.env.REACT_APP_API_URL}/events/${eventId}/${hash}`)
    .then((res) => {
      tmpDateRange = {
        start: dayjs(res.data['start_date']),
        end: dayjs(res.data['end_date']),
      };
      setDateRange(tmpDateRange);
    })
    .catch((err) => {
      error('データの取得に失敗しました');
    })
    .finally(() => {
      setShowLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  // パスワード認証
  const handleAuthenticate = (password: string) => {
    setShowContent(true);
    setPassword(password);
  }

  const func = (statusArr: string[]) => {
    return "green";
  }

  return (
    <>
    {contextHolder}
      <Header pages={[{"name": "登録画面", "path": `${process.env.REACT_APP_URL}/register/${eventId}/${hash}`}]}/>
      <Container maxWidth='md'>
        { !showContent && <OwnerPasswordBox handleAuthenticate={handleAuthenticate}/> }
        { showContent && <ViewCalendar dateRange={dateRange} password={password} func={func}/> }
      </Container>
      <LoadingBackdrop isShow={showLoading} />
    </>
  )
}
