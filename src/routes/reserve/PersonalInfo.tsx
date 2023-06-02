import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useReservation } from "./ReservationProvider";

function PersonalInfo({ goPrev }: { goPrev: () => void }) {
  const { id: showId } = useParams() as { id: string };
  const { personalInfo, setPersonalInfo } = useReservation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPersonalInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // eslint-disable-next-line no-console
    console.log("reserving: ", showId, personalInfo);
  };

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "50%" },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Imię"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
              inputProps={{ pattern: "[A-Za-z]+" }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Nazwisko"
              name="surname"
              value={personalInfo.surname}
              onChange={handleChange}
              inputProps={{ pattern: "[A-Za-z]+" }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="email"
              label="Email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="tel"
              label="Telefon"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              inputProps={{ pattern: "[0-9]{9}" }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} />
          <Grid item xs={12} sm={6} sx={{ marginTop: { xs: "1rem" } }}>
            <Stack direction="row" spacing={1}>
              <Button fullWidth variant="outlined" onClick={goPrev}>
                WSTECZ
              </Button>
              <Button fullWidth variant="contained" type="submit">
                REZERWUJ
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default PersonalInfo;
