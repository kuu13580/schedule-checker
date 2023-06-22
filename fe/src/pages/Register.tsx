import { Container, Typography } from "@mui/material";
import { RegisterCalendar, PasswordBox, UserSelector, AddUser } from "../components";
import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { message } from "antd";
import { Header } from "../components";
import { DateRange } from "../models";
import dayjs from "dayjs";
import axios from "axios";
import { LoadingBackdrop } from "../components";

export const Register = () => {
  const { eventId, hash } = useParams<{eventId: string, hash: string}>();
  const [showContent, setShowContent] = useState<string>('PasswordBox');
  const [password, setPassword] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange>({start: dayjs(), end: dayjs()});
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [eventTitle, setEventTitle] = useState<string>('');

  const [messageApi, contextHolder] = message.useMessage();

  // バナー表示
  const topBanner = (type: "error" | "success", msg: string) => {
    messageApi.open({
      type: type,
      content: msg,
      duration: type === "error" ? 5 : type === "success" ? 2 : 3,
    });
  }

  // クエリパラメータを取得、ユーザーIDを設定
  const [searchParams, setSearchParams] = useSearchParams();
  const userIdFromQuery = searchParams.get('user');
  const previousPage = searchParams.get('prev');
  let isBannered = false;
  useEffect(() => {
    if (isBannered) return;
    if (userIdFromQuery) {
      setUserId(userIdFromQuery);
      setSearchParams({});
      topBanner("success", "ユーザー登録が完了しました");
      // eslint-disable-next-line
      isBannered = true;
    }
    if (previousPage) {
      previousPage === "delete" && topBanner("success", "ユーザーを削除しました");
      previousPage === "create" && topBanner("success", "イベントを作成しました");
      setSearchParams({});
      // eslint-disable-next-line
      isBannered = true;
    }
    // イベント全般のデータを取得
    setShowLoading(true);
    // イベント全般のデータを取得
    axios.get(`${process.env.REACT_APP_API_URL}/events/${eventId}/${hash}`)
      .then((res) => {
        const tmpDateRange: DateRange = {
          start: dayjs(res.data['start_date']),
          end: dayjs(res.data['end_date']),
        };
        setEventTitle(res.data['name']);
        setDateRange(tmpDateRange);
      })
      .catch((err) => {
        topBanner("error", 'データの取得に失敗しました');
      })
      .finally(() => {
        setShowLoading(false);
    });
  }, []);

  // パスワード認証
  const handleAuthenticate = (password: string) => {
    setShowContent("RegisterCalendar");
    setPassword(password);
  }

  return (
    <>
      <Header pages={[{"name": "管理者画面", "path": `${process.env.REACT_APP_URL}/owner/${eventId}/${hash}`}]}/>
      {contextHolder}
      <Container maxWidth='md' sx={{my: 2}}>
        <Typography
          variant="h4"
          sx = {{ my: 2 }}
          >
          {eventTitle}
        </Typography>
        <UserSelector
          userId={userId}
          setPassword={setPassword}
          setUserId={setUserId}
          setShowContent={setShowContent}
          topBanner={topBanner}/>
        {showContent === "PasswordBox" && <PasswordBox userId={userId} handleAuthenticate={handleAuthenticate} />}
        {showContent === "RegisterCalendar" && <RegisterCalendar userId={userId} password={password} dateRange={dateRange} topBanner={topBanner}/> }
        {showContent === "AddUser" && <AddUser topBanner={topBanner}/>}
      </Container>
      <LoadingBackdrop isShow={showLoading} />
    </>
  );
}
