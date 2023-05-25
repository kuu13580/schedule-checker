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
      <Radio {...controlProps('unavailable')} sx={{...controlSx('red')}}/>unavailable
      <Radio {...controlProps('potential')} sx={{...controlSx('#FFD700')}}/>potential
      <Radio {...controlProps('available')} sx={{...controlSx('green')}}/>available
    </>
  )
}