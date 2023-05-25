import { TextField } from '@mui/material';
import { useState } from 'react';

export const PasswordBox = () => {

  const [password, setPassword] = useState<string>('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const lastDigit = inputValue.slice(-1);
    
    setPassword(inputValue);
    if (inputValue.length === 4) authenticate(inputValue);
  };

  const authenticate = (password: string) => {
    // パスワード認証
    console.log("authenticate!");
  }

  return (
    <>
      <TextField
        onChange={handlePasswordChange}
        value={password}
        label="Password"
        type="number"
        margin='normal'
        inputProps={{ maxLength: 4 }}
        />
    </>
  )
}