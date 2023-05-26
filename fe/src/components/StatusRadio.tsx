import { Radio, RadioGroup } from "@mui/joy";

export const StatusRadio = (props: {selectedStatus: string, setSelectedStatus: any}) => {
  const setSelectedStatus = props.setSelectedStatus;
  const selectedStatus = props.selectedStatus;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  const statusArr = [
    {status: 'unavailable', color: 'danger', label: 'unavailable'},
    {status: 'potential', color: 'warning', label: 'potential'},
    {status: 'available', color: 'success', label: 'available'},
  ]

  return (
    <>
      <RadioGroup 
        name="status"
        onChange={handleChange}
        orientation="horizontal"
      >
        {statusArr.map((status) => {
          const color = status.color as "danger" | "warning" | "success" | "primary" | "neutral" | "info" | undefined;
          return (
            <Radio
              key={status.status}
              checked={selectedStatus === status.status}
              onChange={handleChange}
              value={status.status}
              label={status.label}
              name='status'
              variant='soft'
              color={color}/>
          );
        })}
      </RadioGroup>
    </>
  )
}