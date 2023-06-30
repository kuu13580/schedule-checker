import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent, DialogTitle, AppBar, Toolbar, Card, CardContent, Typography } from '@mui/material';
import createImage from '../img/create.png';
import addUserImage from '../img/addUser.png'
import userSelector from '../img/userSelector.png'
import registerPageImage from '../img/registerPage.png'

export const HowToUse = (props: { open: boolean, handleOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const open = props.open;
  const handleOpen = props.handleOpen;

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleOpen(false)}
        fullWidth={true}
        maxWidth='md'
        scroll="paper"
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <DialogTitle id="scroll-dialog-title">使用方法</DialogTitle>
            <IconButton
              onClick={() => handleOpen(false)}
              edge="start"
              color="inherit"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent dividers={true}>
          <Typography variant="h4">
            イベント新規作成
          </Typography>
          <Card variant="outlined" sx={{ my: 1 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                関連情報を入力して新規作成します。
              </Typography>
              <img src={createImage} alt="スクリーンショット" style={{ width: '100%', maxWidth: 450 }} />
            </CardContent>
          </Card>
          <Typography variant="h4">
            スケジュール登録
          </Typography>
          <Card variant="outlined" sx={{ my: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                スケジュール登録画面からユーザーを追加してください。
              </Typography>
              <img src={addUserImage} alt="スクリーンショット" style={{ width: '100%', maxWidth: 450 }} />
            </CardContent>
          </Card>
          <Card variant="outlined" sx={{ my: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                先程のパスワードを使ってログインします。
              </Typography>
              <img src={userSelector} alt="スクリーンショット" style={{ width: '100%', maxWidth: 450 }} />
            </CardContent>
          </Card>
          <Card variant="outlined" sx={{ my: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                スケジュールを登録、保存します。
              </Typography>
              <img src={registerPageImage} alt="スクリーンショット" style={{ width: '100%', maxWidth: 450 }} />
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}
