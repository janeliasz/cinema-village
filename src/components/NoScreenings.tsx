import { Alert } from "@mui/material";

function NoScreenings() {
  return (
    <Alert severity="info">
      Brak seansów wybranego dnia.
    </Alert>
  );
}

export default NoScreenings;
