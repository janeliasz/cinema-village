import { Alert } from "@mui/material";

function NoScreenings() {
  return (
    <Alert severity="info" sx={{ marginTop: { xs: 2 } }}>
      No screenings on this day.
    </Alert>
  );
}

export default NoScreenings;
