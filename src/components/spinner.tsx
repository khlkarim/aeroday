import { CircularProgress } from "@mui/material";

export function Spinner() {
  return (
    <CircularProgress
      size={20}
      thickness={5}
      sx={{
        color: 'currentColor',
        '& .MuiCircularProgress-circle': {
          strokeLinecap: 'round',
        }
      }}
    />
  );
}
