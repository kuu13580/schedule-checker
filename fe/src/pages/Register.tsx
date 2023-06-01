import { Container } from "@mui/material";
import { RegisterCalendar, PasswordBox, UserSelector, AddUser } from "../components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";

export const Register = () => {
  const [showContent, setShowContent] = useState<string>('PasswordBox');
  const [password, setPassword] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

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
  useEffect(() => {
    if (userIdFromQuery) {
      setUserId(userIdFromQuery);
      setSearchParams({});
      topBanner("success", "ユーザー登録が完了しました");
    }
  }, []);

  // パスワード認証
  const handleAuthenticate = (password: string) => {
    setShowContent("RegisterCalendar");
    setPassword(password);
  }

  return (
    <>
      {contextHolder}
      <Container maxWidth='md' sx={{my: 2}}>
        <UserSelector
          userId={userId}
          setPassword={setPassword}
          setUserId={setUserId}
          setShowContent={setShowContent}
          topBanner={topBanner}/>
        {showContent === "PasswordBox" && <PasswordBox userId={userId} handleAuthenticate={handleAuthenticate} />}
        {showContent === "RegisterCalendar" && <RegisterCalendar userId={userId} password={password} topBanner={topBanner}/> }
        {showContent === "AddUser" && <AddUser topBanner={topBanner}/>}
      </Container>
    </>
  );
}
