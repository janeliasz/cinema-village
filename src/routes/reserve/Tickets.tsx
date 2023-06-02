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
import { useReservation } from "./ReservationProvider";
import { TicketType } from "./types";

const ticketPrices = {
  [TicketType.Normal]: 26,
  [TicketType.Premium]: 34,
  [TicketType.Student]: 20,
  [TicketType.Senior]: 21,
};

function Tickets({ goNext }: { goNext: () => void }) {
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
      <Grid container>
        <Grid
          item
          xs={4}
          sx={{
            marginBottom: { xs: 1, md: 3 },
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>RODZAJ</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            LICZBA
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
            CENA
          </Typography>
        </Grid>

        {selectedTickets.map(({ type, numOfTickets }, rowIdx) => (
          <React.Fragment key={type}>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
              <IconButton color="error" onClick={() => removeType(type)}>
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
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
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
              xs={4}
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
            marginTop: { xs: 1, md: 3 },
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
