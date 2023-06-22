import { useParams } from "react-router-dom"
import { Header, ViewCalendar, LoadingBackdrop, OwnerPasswordBox } from "../components";
import { DateRange } from "../models";
import dayjs from "dayjs";
import { Box, Checkbox, Container, FormControlLabel, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const OwnerView = () => {
  const { eventId, hash } = useParams<{eventId: string, hash: string}>();
  const [dateRange, setDateRange] = useState<DateRange>({start: dayjs(), end: dayjs()});
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showContent, setShowContent] = useState<boolean>(false);
  const [forceUnavailebleRed, setForceUnavailebleRed] = useState<boolean>(false);
  const [allowableUnavailable, setAllowableUnavailable] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(100);
  const [eventTitle, setEventTitle] = useState<string>('');

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
      setEventTitle(res.data['name']);
      setUserCount(res.data['user_count']);
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

  const func = (statusArr: number[]) => {
    const countUnavailable = statusArr.filter((s) => s === 2).length;
    if (forceUnavailebleRed) { // 強制赤色
      if  (countUnavailable > allowableUnavailable) return 'rgb(255, 0, 0)';
      const max = statusArr.length * 2;
      const ratio = Math.min(statusArr.reduce((acc, cur) => { return acc + cur }, 0) / max * 80 / threshold, 1);
      return getColorByGradient(ratio);
    } else {
      const max = 2 * statusArr.length;
      const ratio = Math.min(statusArr.reduce((acc, cur) => { return acc + cur; }, 0) / max * 100 / threshold, 1);
      return getColorByGradient(ratio);
    }
  }

  const getColorByGradient = (ratio: number) => {
    let r, g, b;
    b = 0;
    if (ratio <= 0.5) {
      // 緑から黄色へのグラデーション
      r = Math.floor(255 * (2 * ratio));
      g = 255;
    } else {
      // 黄色から赤へのグラデーション
      r = 255;
      g = Math.floor(255 * (2 - 2 * ratio));
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <>
    {contextHolder}
      <Header pages={[{"name": "登録画面", "path": `${process.env.REACT_APP_URL}/register/${eventId}/${hash}`}]}/>
      <Container maxWidth='md'>
      <Typography
        variant='h4'
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {eventTitle}
      </Typography>
        { !showContent && <OwnerPasswordBox handleAuthenticate={handleAuthenticate}/> }
        { showContent &&
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={forceUnavailebleRed}
                  onChange={(e) => setForceUnavailebleRed(e.target.checked)}
                />
              }
              label="不可を含む日程を赤色にする"
            />
            <div>許容不可人数: {allowableUnavailable}</div>
            <Slider
              value={allowableUnavailable}
              min={0}
              max={userCount - 1}
              step={1}
              disabled={!forceUnavailebleRed}
              onChange={(e, v) => {setAllowableUnavailable(v as number)}}
              />
            <div>しきい値：</div>
            <Slider
              min={1}
              value={threshold}
              onChange={(e, v) => {setThreshold(v as number)}}
              />
            {!forceUnavailebleRed &&
              <Box
                sx={{
                  width: '100%',
                  height: 10,
                  background: `linear-gradient(to right, rgb(0, 255, 0), rgb(255,255,0), rgb(255, 0, 0) ${threshold}%, rgb(255, 0, 0))`
                }}
              />}
            {forceUnavailebleRed &&
              <Box
                sx={{
                  width: '100%',
                  height: 10,
                  background: 'linear-gradient(to right, rgb(0, 255, 0), rgb(255,255,0), rgb(255, 50, 0))'
                }}
              />
            }
            <ViewCalendar dateRange={dateRange} password={password} func={func}/>
          </>
        }
      </Container>
      <LoadingBackdrop isShow={showLoading} />
    </>
  )
}
