import { TextField, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

export const AddUser = (props: {setPassword: React.Dispatch<React.SetStateAction<string>>, setUserId: React.Dispatch<React.SetStateAction<string | undefined>>, setShowContent: React.Dispatch<React.SetStateAction<string>>}) => {
  const setPassword = props.setPassword;
  const setUserId = props.setUserId;
  const setShowContent = props.setShowContent;

  // パスクエリ取得
  const { hash, eventId } = useParams<{hash: string, eventId: string}>();

  const [messageApi, contextHolder] = message.useMessage();

  // エラーメッセージ
  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
      duration: 5,
    });
  }
  const success = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg,
      duration: 2,
    });
  }

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
        setUserId(res.data['user_id']);
        setPassword(watch('password'));
        setShowContent('PasswordBox');
        success("ユーザー登録が完了しました\nパスワードを入力してください");
      }).catch(err => {
        error("ユーザー登録に失敗しました");
      });

  }

  return (
    <>
      {contextHolder}
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
