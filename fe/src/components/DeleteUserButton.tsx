import { Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const DeleteUserButton = (props: {userId: string, password: string}) => {
  const { hash } = useParams<{hash: string}>();
  const userId = props.userId;
  const password = props.password;

  const deleteUser = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/users/${userId}/${hash}/delete`, {password: password})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
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
