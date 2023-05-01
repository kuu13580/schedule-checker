import {Radio} from "@mui/material";

export const StatusRadio = (props: {selectedStatus: string, setSelectedStatus: any}) => {
  const setSelectedStatus = props.setSelectedStatus;
  const selectedStatus = props.selectedStatus;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };
  const controlProps = (item: string) => ({
    checked: selectedStatus === item,
    onChange: handleChange,
    value: item,
    name: 'status',
    inputProps: { 'aria-label': item }
  });
  const controlSx = (color: string) => ({
    color: color,
    '&.Mui-checked': {
      color: color
    }
  });
  return (
    <>
      <Radio {...controlProps('busy')} sx={{...controlSx('red')}}/>busy
      <Radio {...controlProps('danger')} sx={{...controlSx('#FFD700')}}/>danger
      <Radio {...controlProps('')} sx={{...controlSx('black')}}/>none
    </>
  )
}