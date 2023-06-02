import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Summary({ goPrev }: { goPrev: () => void }) {
  const { id: showId } = useParams() as { id: string };
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("reserving: ", showId, name, surname, email, phone);
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              inputProps={{ pattern: "[A-Za-z]+" }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Nazwisko"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="tel"
              label="Telefon"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
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

export default Summary;
