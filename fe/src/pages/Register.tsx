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
  const success = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg,
      duration: 2,
    });
  }

  // クエリパラメータを取得、ユーザーIDを設定
  const [searchParams, setSearchParams] = useSearchParams();
  const userIdFromQuery = searchParams.get('user');
  useEffect(() => {
    if (userIdFromQuery) {
      setUserId(userIdFromQuery);
      setSearchParams({});
      success("ユーザー登録が完了しました");
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
          setShowContent={setShowContent}/>
        {showContent === "PasswordBox" && <PasswordBox userId={userId} handleAuthenticate={handleAuthenticate} />}
        {showContent === "RegisterCalendar" && <RegisterCalendar userId={userId} password={password} /> }
        {showContent === "AddUser" && <AddUser />}
      </Container>
    </>
  );
}
