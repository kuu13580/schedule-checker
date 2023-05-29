import { Button } from '@mui/material';

export const DeleteUserButton = (props: {userId: string, password: string}) => {
  const userId = props.userId;
  const password = props.password;

  const deleteUser = () => {
    // TODO: ユーザー削除処理
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
