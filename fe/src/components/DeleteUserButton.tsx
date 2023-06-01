import { Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const DeleteUserButton = (props: {userId: string, password: string, topBanner: (type: "error" | "success", msg: string) => void}) => {
  const { eventId, hash } = useParams<{eventId: string, hash: string}>();
  const userId = props.userId;
  const password = props.password;
  const topBanner = props.topBanner;

  const deleteUser = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/${userId}/${hash}/delete`, {password: password})
      .then((res) => {
        window.location.href = `/register/${eventId}/${hash}`;
      })
      .catch((err) => {
        topBanner("error", "ユーザーの削除に失敗しました");
      }
    );
  }

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={deleteUser}
        sx={{ml: 2}}
      >
        ユーザー削除
      </Button>
    </>
  );
}
