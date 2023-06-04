import { TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const PasswordBox = (props: {userId: string, handleAuthenticate: (password: string) => void}) => {
  const userId = props.userId;

  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [remain, setRemain] = useState<number>(0);

  const { hash } = useParams<{hash: string}>();
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // 数字以外の入力を無効とする
    if (isNaN(Number(inputValue))) {
      setPassword(inputValue.slice(0, -1));
      return;
    }

    setPassword(inputValue);
    setIsError(false);

    // 4桁入力されたら認証
    if (inputValue.length === 4) authenticate(inputValue);
  };

  // パスワード認証
  const authenticate = (password: string) => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/${userId}/${hash}/authenticate`, { password: password })
      .then((res) => {
        if(res.data['result'] === true) {
          props.handleAuthenticate(password);
        } else {
          setIsError(true);
          setPassword('');
          setRemain(res.data['remain']);
        }
      })
  }

  return (
    <>
      <TextField
        onChange={handlePasswordChange}
        value={password}
        label="パスワード(数字4桁)"
        type="password"
        margin='normal'
        inputProps={{ maxLength: 4 }}
        error={isError}
        helperText={isError && (remain === 0 ? "パスワードの試行回数を超えたためロック中" : `パスワードが間違っています(残り${remain}回試行可能)`)}
        />
    </>
  )
}
