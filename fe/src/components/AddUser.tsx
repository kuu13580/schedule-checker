import { TextField, Grid, Button } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const AddUser = () => {

  const { register, watch, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues: {
        userName: '',
        password: '',
        passwordConfirm: '',
      }
    }
  );

  const onSubmit = (data: any) => {
    console.log(data);
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id="userName"
            label="ユーザー名(最大10文字)"
            variant="outlined"
            inputProps={{ maxLength: 10 }}
            {...register('userName', { required: true, maxLength: 10 })}
            helperText={"userName" in errors && "ユーザー名は必須です"}
            error={"userName" in errors}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="パスワード(数字4桁)"
            variant="outlined"
            type='password'
            inputProps={{ maxLength: 4 }}
            {...register('password', { required: true, pattern: /^[0-9]{4}$/ })}
            helperText={"password" in errors && "パスワードは4桁の数字です"}
            error={"password" in errors}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="passwordConfirm"
            label="パスワード(確認)"
            variant="outlined"
            type='password'
            inputProps={{ maxLength: 4 }}
            {...register('passwordConfirm', { required: true, validate: (value) => value === watch('password') })}
            helperText={"passwordConfirm" in errors && "パスワードが一致しません"}
            error={"passwordConfirm" in errors}
          />
        </Grid>
        <Grid item xs={12}> 
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>追加</Button>
        </Grid>
      </Grid>
    </>
  )
}