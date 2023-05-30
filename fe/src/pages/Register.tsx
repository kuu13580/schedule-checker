import { Container } from "@mui/material";
import { RegisterCalendar, PasswordBox, UserSelector, AddUser } from "../components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Register = () => {
  const [showContent, setShowContent] = useState<string>('PasswordBox');
  const [password, setPassword] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  // クエリパラメータを取得、ユーザーIDを設定
  const [searchParams, setSearchParams] = useSearchParams();
  const userIdFromQuery = searchParams.get('user');
  useEffect(() => {
    if (userIdFromQuery) {
      setUserId(userIdFromQuery);
      setSearchParams({});
    }
  }, [userIdFromQuery]);

  // パスワード認証
  const handleAuthenticate = (password: string) => {
    setShowContent("RegisterCalendar");
    setPassword(password);
  }

  return (
    <>
      <Container maxWidth='md' sx={{my: 2}}>
        <UserSelector
          userId={userId}
          setPassword={setPassword}
          setUserId={setUserId}
          setShowContent={setShowContent}/>
        {showContent === "PasswordBox" && <PasswordBox userId={userId} handleAuthenticate={handleAuthenticate} />}
        {showContent === "RegisterCalendar" && <RegisterCalendar userId={userId} password={password} /> }
        {showContent === "AddUser" && <AddUser setPassword={setPassword} setUserId={setUserId} setShowContent={setShowContent} />}
      </Container>
    </>
  );
}
