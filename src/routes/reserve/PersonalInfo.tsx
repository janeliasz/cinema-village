import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useReservation } from "./ReservationProvider";
import { ticketPrices } from "./Tickets";

function PersonalInfo({ goPrev }: { goPrev: () => void }) {
  const { id: showId } = useParams() as { id: string };
  const { personalInfo, setPersonalInfo, selectedTickets } = useReservation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPersonalInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // eslint-disable-next-line no-console
    console.log("reserving: ", showId, personalInfo, selectedTickets);
  };

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "50%" },
      }}
    >
      <Paper>
        <List>
          {selectedTickets.map((ticket) => (
            <ListItem key={ticket.type}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ width: "100%" }}
              >
                <Typography variant="subtitle1">
                  {ticket.type} - {ticket.numOfTickets}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {(ticket.numOfTickets * ticketPrices[ticket.type]).toFixed(2)}{" "}
                  zł
                </Typography>
              </Stack>
            </ListItem>
          ))}
          {selectedTickets.length > 1 && (
            <ListItem>
              <Typography
                fontWeight="bold"
                textAlign="right"
                sx={{ width: "100%" }}
              >
                ŁĄCZNIE:{" "}
                {selectedTickets
                  .reduce(
                    (acc, current) =>
                      acc + current.numOfTickets * ticketPrices[current.type],
                    0,
                  )
                  .toFixed(2)}{" "}
                zł
              </Typography>
            </ListItem>
          )}
        </List>
      </Paper>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={1}
          sx={{ marginTop: { xs: "1rem", md: "2rem" } }}
        >
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
