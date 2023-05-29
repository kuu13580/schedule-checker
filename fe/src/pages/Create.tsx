import { Controller, useForm } from "react-hook-form";
import { Button, Container, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ja from 'dayjs/locale/ja';
import { EventForm } from "../models";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import axios from "axios";


export const Create = () => {
  const { register, control, handleSubmit, formState: { errors }, watch } = useForm<EventForm>({
    defaultValues: {
      name: '',
      ownerName: '',
      startDate: null,
      endDate: null,
      password: '',
    }
  })

  // 日付関連
  const [dateError, setDateError] = useState<boolean>(false);
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    if (startDate && endDate) {
      if (startDate.isAfter(endDate)) {
        setDateError(true);
      } else {
        setDateError(false);
      }
    } else {
      setDateError(false);
    }
  }, [startDate, endDate])

  const onSubmit = (data: any) => {
    if (dateError) return;
    console.log({...data, startDate: startDate?.format('YYYY-MM-DD'), endDate: endDate?.format('YYYY-MM-DD')});
    axios.post(process.env.REACT_APP_API_URL + '/events/create', {...data, startDate: startDate?.format('YYYY-MM-DD'), endDate: endDate?.format('YYYY-MM-DD')})
      .then(res => {
        if (res.status !== 200) {
          console.log(res);
          return;
        }
        const eventId = res.data["event_id"];
        const hash = res.data["pass"];
        // TODO: リダイレクト
        // location.href = `/events/${eventId}?hash=${hash}`;
      }).catch(err => {
        console.log(err);
      }
    );
  }

  return (
    <Container maxWidth={'lg'}>
      <h1>Create未実装</h1>
      <Box sx={{ display: 'flex', flexDirection: "column", width: {xs: '90svw', sm: '550px'}, mx: 'auto' }}>
        <TextField
          required
          label="イベント名(最大20文字)"
          variant="outlined"
          inputProps={{ maxLength: 20 }}
          {...register('name', { required: true, maxLength: 20 })}
          error={"name" in errors} />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ja}>
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
                    helperText: dateError && '日付が前後しています',
                  },
                }}
              />
            )} />
        </LocalizationProvider>
        <TextField
          required
          label="主催者名（最大10文字）"
          inputProps={
            { maxLength: 10 }
          }
          variant="outlined"
          {...register('ownerName', { required: true, maxLength: 10 })}
          error={"ownerName" in errors} />
        <TextField
          required
          label="パスワード(数字4桁)"
          type="password"
          variant="outlined"
          inputProps={{ maxLength: 4 }}
          {...register('password', { required: true, pattern: /^[0-9]{4}$/ })}
          error={"password" in errors} />
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}>
          作成
        </Button>
        <Button
          onClick={() => console.log(errors)}>
          デバッグ
        </Button>
      </Box>
    </Container>
  )
}