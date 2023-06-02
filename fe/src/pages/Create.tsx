import { Controller, useForm } from "react-hook-form";
import { Button, Container, TextField, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ja from 'dayjs/locale/ja';
import { EventForm } from "../models";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";


export const Create = () => {
  const { register, control, handleSubmit, formState: { errors }, watch } = useForm<EventForm>({
    defaultValues: {
      name: '',
      ownerName: '',
      startDate: null,
      endDate: null,
      password: '',
      passwordConfirm: '',
    }
  })

  const [messageApi, contextHolder] = message.useMessage();
  // バナー表示
  const topBanner = (type: "error" | "success", msg: string) => {
    messageApi.open({
      type: type,
      content: msg,
      duration: type === "error" ? 5 : type === "success" ? 2 : 3,
    });
  }

  // 日付関連
  const [dateError, setDateError] = useState<string | null>(null);
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    if (startDate && endDate) {
      if (startDate.isAfter(endDate)) {
        setDateError("orderError");
      } else {
        setDateError(null);
      }
    } else {
      setDateError("requiredError");
    }
  }, [startDate, endDate])

  const onSubmit = (data: any) => {
    if (dateError) return;
    axios.post(process.env.REACT_APP_API_URL + '/events/create', {...data, startDate: startDate?.format('YYYY-MM-DD'), endDate: endDate?.format('YYYY-MM-DD')})
      .then(res => {
        if (res.status !== 200) {
          return;
        }
        const eventId = res.data["event_id"];
        const hash = res.data["pass"];
        window.location.href = `/register/${eventId}/${hash}?prev=create`;
      }).catch(err => {
        topBanner("error", "イベント作成に失敗しました");
      }
    );
  }

  return (
    <Container maxWidth={'lg'}>
      {contextHolder}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            label="イベント名(最大20文字)"
            variant="outlined"
            inputProps={{ maxLength: 20 }}
            {...register('name', { required: true, maxLength: 20 })}
            error={"name" in errors} />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ja}>
          <Grid item xs={12}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="始点日"
                  format="YYYY/M/D"
                />
              )} />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="終点日"
                  format="YYYY/M/D"
                  slotProps={{
                    textField: {
                      helperText: dateError === 'orderError' ? '日付が前後しています' : dateError === 'requiredError' ? '日付を入力してください' : '',
                    },
                  }}
                />
              )} />
          </Grid>
        </LocalizationProvider>
        <Grid item xs={12}>
          <TextField
            required
            label="主催者名（最大10文字）"
            inputProps={
              { maxLength: 10 }
            }
            variant="outlined"
            {...register('ownerName', { required: true, maxLength: 10 })}
            error={"ownerName" in errors} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="パスワード(数字4桁)"
            type="password"
            variant="outlined"
            inputProps={{ maxLength: 4 }}
            {...register('password', { required: true, pattern: /^[0-9]{4}$/ })}
            error={"password" in errors} />
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
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}>
            作成
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => console.log(errors)}>
            デバッグ
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
