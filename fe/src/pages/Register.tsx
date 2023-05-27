import { Container } from "@mui/material";
import { RegisterCalendar, PasswordBox } from "../components";
import { useState } from "react";

export const Register = () => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [userId, setUserId] = useState<string>('1');

  // パスワード認証
  const handleAuthenticate = (password: string) => {
    setShowContent(true);
    setPassword(password);
  }

  return (
    <>
      <Container maxWidth='md'>
        {!showContent && <PasswordBox userId={userId} handleAuthenticate={handleAuthenticate} />}
        {showContent && <RegisterCalendar password={password} /> }
      </Container>
    </>
  );
}
