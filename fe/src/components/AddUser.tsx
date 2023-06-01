import { TextField, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const AddUser = (props: {topBanner: (type: "error" | "success", msg: string) => void}) => {
  const topBanner = props.topBanner;

  // パスクエリ取得
  const { hash, eventId } = useParams<{hash: string, eventId: string}>();

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
    // ユーザー登録処理
    axios.post(`${process.env.REACT_APP_API_URL}/users/${eventId}/${hash}/create`, data)
      .then(res => {
        window.location.href=`/register/${eventId}/${hash}?user=${res.data['id']}`;
      }).catch(err => {
        topBanner("error", "ユーザー登録に失敗しました");
      });

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
