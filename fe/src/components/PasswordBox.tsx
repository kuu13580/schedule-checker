import { TextField } from '@mui/material';
import { useState } from 'react';
import { set } from 'react-hook-form';

export const PasswordBox = (props: {handleAuthenticate: (password: string) => void}) => {

  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    console.log(inputValue);

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

  const authenticate = (password: string) => {
    setIsError(true);
    // パスワード認証
    props.handleAuthenticate(password);
    console.log("authenticate!");
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
        helperText={isError && "パスワードが間違っています"}
        />
    </>
  )
}
