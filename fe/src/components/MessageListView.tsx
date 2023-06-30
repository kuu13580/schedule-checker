import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserMessage } from "../models";
import axios from "axios";
import { Stack, Paper, Box, Typography } from "@mui/material";


export const MessageListView = (props: {password: string}) => {
  const password = props.password;
  const { eventId, hash } = useParams<{eventId: string, hash: string}>();
  const [userMessages, setUserMessages] = useState<UserMessage[]>([]);

  // メッセージ取得
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/messages/${eventId}/${hash}`, { password: password })
      .then((res) => {
        setUserMessages(res.data.map((d: any) => {
          console.log(d);
          return {
            userId: d['user_id'],
            userName: d['name'],
            message: d['message']
          } as UserMessage;
        }));
      })
      .catch((err) => {
        console.log(err);
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Stack spacing={2} sx={{ my: 2 }}>
        {userMessages.map((m) => {
          if (!m.message) return (<></>);
          return (
            <Paper key={m.userId} elevation={3}>
              <Box sx={{ m: 1 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold', my: 1 }}>{m.userName}</Typography>
                <Typography sx={{ fontSize: 16, my: 1, whiteSpace: 'pre-wrap' }}>{m.message}</Typography>
              </Box>
            </Paper>
          );
        }
        )}
      </Stack>
    </>
  );
}
