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

export enum TicketType {
  Normal = "Normalny",
  Premium = "Premium",
  Student = "Studencki",
  Senior = "Senior",
}

export type SelectedTicket = {
  type: TicketType;
  numOfTickets: number;
};

const ticketPrices = {
  [TicketType.Normal]: 26,
  [TicketType.Premium]: 34,
  [TicketType.Student]: 20,
  [TicketType.Senior]: 21,
};

function Tickets({
  goNext,
  selectedTickets,
  setSelectedTickets,
}: {
  goNext: () => void;
  selectedTickets: SelectedTicket[];
  setSelectedTickets: React.Dispatch<React.SetStateAction<SelectedTicket[]>>;
}) {
  const selectedTypes = selectedTickets.map(({ type }) => type);
  const typesToSelect = [
    TicketType.Normal,
    TicketType.Premium,
    TicketType.Student,
    TicketType.Senior,
  ].filter((type) => !selectedTypes.includes(type));

  const onTypeChange = (e: SelectChangeEvent<TicketType>, rowIdx: number) => {
    setSelectedTickets((prev) =>
      prev.map((ticket, idx) =>
        idx === rowIdx
          ? {
              type: e.target.value as TicketType,
              numOfTickets: ticket.numOfTickets,
            }
          : ticket,
      ),
    );
  };

  const onNumberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIdx: number,
  ) => {
    setSelectedTickets((prev) =>
      prev.map((ticket, idx) =>
        idx === rowIdx
          ? {
              type: ticket.type,
              numOfTickets: Number(e.target.value),
            }
          : ticket,
      ),
    );
  };

  const addNewType = () => {
    setSelectedTickets((prev) => [
      ...prev,
      { type: typesToSelect[0], numOfTickets: 1 },
    ]);
  };

  const removeType = (type: TicketType) => {
    setSelectedTickets((prev) => prev.filter((ticket) => ticket.type !== type));
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
            onClick={addNewType}
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
