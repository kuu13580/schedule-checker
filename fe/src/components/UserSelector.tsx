import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../models";
import { LoadingBackdrop } from "./";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export const UserSelector = (props: {userId: string, setPassword: React.Dispatch<React.SetStateAction<string>>, setUserId: React.Dispatch<React.SetStateAction<string>>, setShowContent: React.Dispatch<React.SetStateAction<string>>, topBanner: (type: "error" | "success", msg: string) => void}) => {
  const setPassword = props.setPassword;
  const setUserId = props.setUserId;
  const setShowContent = props.setShowContent;
  const topBanner = props.topBanner;
  const userId = props.userId;

  const { eventId, hash } = useParams<{eventId: string, hash: string}>();

  const [users, setUsers] = useState<User[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  // ユーザー一覧を取得
  useEffect(() => {
    setShowLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/users/${eventId}/${hash}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        topBanner("error", "ユーザー一覧の取得に失敗しました。");
      })
      .finally(() => {
        setShowLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setUserId(event.target.value);
    if (event.target.value === 'new') {
      setShowContent('AddUser');
      return;
    }
    setPassword('');
    setShowContent('PasswordBox');
  };

  return (
    <>
      <FormControl sx={{display: "flex", my: 2}}>
        <InputLabel id="select-label">ユーザー</InputLabel>
        <Select
          labelId="select-label"
          id="select-label"
          label="ユーザー"
          value={userId}
          onChange={handleChange}
          MenuProps={{PaperProps: {style: { maxHeight: '20svh', overflowY: 'scroll' }}}}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}
          <MenuItem value="new">ユーザー追加</MenuItem>
        </Select>
      </FormControl>
      <LoadingBackdrop isShow={showLoading} />
    </>
  );
}
