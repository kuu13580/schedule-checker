import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../models";
import { message } from "antd";
import { LoadingBackdrop } from "./";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export const UserSelector = (props: {setPassword: React.Dispatch<React.SetStateAction<string>>, setUserId: React.Dispatch<React.SetStateAction<string>>, setShowContent: React.Dispatch<React.SetStateAction<string>>}) => {
  const setPassword = props.setPassword;
  const setUserId = props.setUserId;
  const setShowContent = props.setShowContent;

  const { eventId, hash } = useParams<{eventId: string, hash: string}>();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
      duration: 5,
    });
  }

  // ユーザー一覧を取得
  useEffect(() => {
    setShowLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/users/${eventId}/${hash}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        error("ユーザー一覧の取得に失敗しました。");
      })
      .finally(() => {
        setShowLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedUser(event.target.value);
    setUserId(event.target.value);
    setPassword('');
    setShowContent('PasswordBox');
  };

  return (
    <>
      {contextHolder}
      <FormControl sx={{display: "flex", my: 2}}>
        <InputLabel id="select-label">ユーザー</InputLabel>
        <Select
          labelId="select-label"
          id="select-label"
          label="ユーザー"
          value={selectedUser}
          onChange={handleChange}
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
