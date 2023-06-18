import { Alert } from "@mui/material";

function NoSeats() {
  return (
    <Alert severity="error">
      Brak wystarczającej liczby miejsc.
    </Alert>
  );
}

export default NoSeats;
