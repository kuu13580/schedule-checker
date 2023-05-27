import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingBackdrop = (props: {isShow: boolean}) => {
  const isShow = props.isShow;

  return (
    <>
      <Backdrop
        open={isShow}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
