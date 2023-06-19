import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { useReservation } from "./ReservationProvider";
import { SeatType, TicketType } from "../../types";
import { useGetAvailableSeatsQuery } from "../../api/showsApi";
import NoSeats from "../../components/NoSeats";

export const ticketPrices = {
  [TicketType.Normal]: 26,
  [TicketType.Premium]: 34,
  [TicketType.Student]: 20,
  [TicketType.Senior]: 21,
};

function Tickets({ goNext }: { goNext: () => void }) {
  const { id: showId } = useParams() as { id: string };

  const { data: availableSeats } = useGetAvailableSeatsQuery(showId);

  const {
    selectedTickets,
    changeTicketType,
    changeNumOfTickets,
    addTicketType,
    removeTicketType,
  } = useReservation();

  const selectedTypes = selectedTickets.map(({ type }) => type);
  const typesToSelect = [
    TicketType.Normal,
    TicketType.Premium,
    TicketType.Student,
    TicketType.Senior,
  ].filter((type) => !selectedTypes.includes(type));

  const selectedSeatTypes = {
    [SeatType.Normal]: selectedTickets.reduce(
      (acc, ticketType) =>
        ticketType.type !== TicketType.Premium
          ? acc + ticketType.numOfTickets
          : acc,
      0,
    ),
    [SeatType.Premium]: selectedTickets.reduce(
      (acc, ticketType) =>
        ticketType.type === TicketType.Premium
          ? acc + ticketType.numOfTickets
          : acc,
      0,
    ),
  };

  const onTypeChange = (e: SelectChangeEvent<TicketType>, rowIdx: number) => {
    changeTicketType(rowIdx, e.target.value as TicketType);
  };

  const onNumberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIdx: number,
  ) => {
    changeNumOfTickets(rowIdx, Number(e.target.value));
  };

  const addType = () => {
    addTicketType(typesToSelect[0]);
  };

  const removeType = (type: TicketType) => {
    removeTicketType(type);
  };

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "50%" },
      }}
    >
      {availableSeats &&
        (selectedSeatTypes[SeatType.Normal] > availableSeats.normal ||
          selectedSeatTypes[SeatType.Premium] > availableSeats.premium) && (
          <Box sx={{ marginBottom: { xs: 2 } }}>
            <NoSeats />
          </Box>
        )}

      <Grid container>
        <Grid
          item
          xs={6}
          md={4}
          sx={{
            marginBottom: { xs: 1, md: 3 },
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>RODZAJ</Typography>
        </Grid>
        <Grid item xs={3} md={4}>
          <Typography
            sx={{ textAlign: { xs: "left", md: "center" }, fontWeight: "bold" }}
          >
            LICZBA
          </Typography>
        </Grid>
        <Grid item xs={3} md={4}>
          <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
            CENA
          </Typography>
        </Grid>

        {selectedTickets.map(({ type, numOfTickets }, rowIdx) => (
          <React.Fragment key={type}>
            <Grid
              item
              xs={6}
              md={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <IconButton
                color="error"
                onClick={() => removeType(type)}
                sx={{ paddingLeft: { xs: 0, md: 1 } }}
              >
                <DeleteIcon />
              </IconButton>
              <FormControl size="small" variant="standard">
                <Select
                  value={type}
                  onChange={(e) => onTypeChange(e, rowIdx)}
                  disabled={typesToSelect.length === 0}
                >
                  {[type, ...typesToSelect].map((typeToSelect) => (
                    <MenuItem key={typeToSelect} value={typeToSelect}>
                      {typeToSelect}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={3}
              md={4}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "center" },
                alignItems: "center",
              }}
            >
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                error={numOfTickets < 1}
                size="small"
                variant="standard"
                value={numOfTickets.toString()}
                onChange={(e) => {
                  onNumberChange(e, rowIdx);
                }}
              />
            </Grid>

            <Grid
              item
              xs={3}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography>
                {(numOfTickets * ticketPrices[type]).toFixed(2)} zł
              </Typography>
            </Grid>
          </React.Fragment>
        ))}

        {selectedTickets.length > 1 && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: { xs: 1, md: 3 },
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
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
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: { xs: 3, md: 5 },
          }}
        >
          <Button
            variant="contained"
            onClick={addType}
            disabled={typesToSelect.length === 0}
          >
            DODAJ WIĘCEJ
          </Button>

          <Button
            variant="contained"
            onClick={goNext}
            disabled={selectedTickets.length === 0}
          >
            DALEJ
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Tickets;
