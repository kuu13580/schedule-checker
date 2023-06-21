import { useParams } from "react-router-dom"
import { Header } from "../components";

export const OwnerView = () => {
  const { eventId, hash } = useParams<{eventId: string, hash: string}>();

  return (
    <>
      <Header pages={[{"name": "登録画面", "path": `${process.env.REACT_APP_URL}/register/${eventId}/${hash}`}]}/>
    </>
  )
}
