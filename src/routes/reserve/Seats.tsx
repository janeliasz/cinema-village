import { Box, Button, CircularProgress, Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetRoomByIdQuery, useGetShowByIdQuery } from "../../api/showsApi";
import { Room, SeatType, TicketType } from "./types";
import { useReservation } from "./ReservationProvider";
import "./seats.css";

function Seats({ goPrev, goNext }: { goPrev: () => void; goNext: () => void }) {
  const { selectedTickets, selectedSeats } = useReservation();

  const numOfTicketsSelected = selectedTickets.reduce(
    (acc, selectedTicketType) => acc + selectedTicketType.numOfTickets,
    0,
  );

  const goNextDisabled = selectedSeats.length !== numOfTicketsSelected;

  return (
    <Box
      sx={{
        width: { xs: "95%" },
        marginBottom: { xs: "50vh" },
      }}
    >
      <RoomSchema />

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        sx={{ marginTop: { xs: "2rem" } }}
      >
        <Button variant="outlined" onClick={goPrev}>
          WSTECZ
        </Button>
        <Button variant="contained" onClick={goNext} disabled={goNextDisabled}>
          Dalej
        </Button>
      </Stack>
    </Box>
  );
}

function RoomSchema() {
  const { id: showId } = useParams() as { id: string };

  const { data: show } = useGetShowByIdQuery(Number(showId));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data: schema } = useGetRoomByIdQuery(
    { roomId: show?.room.id || -1, screeningId: show?.id || -1 },
    {
      skip: !show,
    },
  ) as {
    isFetching: boolean;
    data: Room;
  };

  const { selectedSeats, selectSeat, deselectSeat, selectedTickets } =
    useReservation();

  const normalSeatsToPick = selectedTickets.reduce(
    (acc, selectedTicketType) =>
      selectedTicketType.type !== TicketType.Premium
        ? acc + selectedTicketType.numOfTickets
        : acc,
    0,
  );

  const normalSeatsPicked = selectedSeats.reduce(
    (acc, seat) =>
      isSeatNormal(schema, seat.rowNumber, seat.seatNumber) ? acc + 1 : acc,
    0,
  );

  const premiumSeatsToPick = selectedTickets.reduce(
    (acc, selectedTicketType) =>
      selectedTicketType.type === TicketType.Premium
        ? acc + selectedTicketType.numOfTickets
        : acc,
    0,
  );

  const premiumSeatsPicked = selectedSeats.reduce(
    (acc, seat) =>
      !isSeatNormal(schema, seat.rowNumber, seat.seatNumber) ? acc + 1 : acc,
    0,
  );

  if (!schema) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <div>
      <div className="screen">EKRAN</div>

      {schema.rows.map((row) => {
        let prevSeatPos = 0;

        return (
          <div
            key={`row${row.rowNumber}`}
            className={`row ${row.shift ? "row-shift" : ""}`}
          >
            <span className="row-number">{row.rowNumber}</span>

            {row.seats.map((seat) => {
              const emptySpace = Array.from(
                { length: seat.positionInRow - prevSeatPos - 1 },
                // eslint-disable-next-line react/self-closing-comp
                (_, i) => <div key={`space${i}`} className="empty-space" />,
              );

              const isSelected =
                selectedSeats.find(
                  (selectedSeat) =>
                    selectedSeat.rowNumber === row.rowNumber &&
                    selectedSeat.seatNumber === seat.seatNumber,
                ) !== undefined;

              const isDisabled =
                !isSelected &&
                (seat.reserved ||
                  (seat.type === SeatType.Normal &&
                    normalSeatsToPick - normalSeatsPicked === 0) ||
                  (seat.type === SeatType.Premium &&
                    premiumSeatsToPick - premiumSeatsPicked === 0));

              prevSeatPos = seat.positionInRow;

              return (
                <React.Fragment key={`seat${seat.seatNumber}`}>
                  {emptySpace}
                  <input
                    type="checkbox"
                    id={`row${row.rowNumber}-seat${seat.seatNumber}`}
                    className="seat"
                    disabled={isDisabled}
                    checked={isSelected}
                    onChange={(e) => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      e.target.checked
                        ? selectSeat(row.rowNumber, seat.seatNumber)
                        : deselectSeat(row.rowNumber, seat.seatNumber);
                    }}
                  />
                  <label
                    htmlFor={`row${row.rowNumber}-seat${seat.seatNumber}`}
                    className={`seat-label
                      ${isSelected ? "seat-selected" : ""}
                      ${seat.reserved ? "seat-reserved" : ""}
                      ${seat.type === SeatType.Premium ? "seat-premium" : ""}
                      ${isDisabled ? "seat-disabled" : ""}`}
                  >
                    {seat.seatNumber}
                  </label>
                </React.Fragment>
              );
            })}
          </div>
        );
      })}

      <div className="legend">
        <div className="legend-item">
          <div className="seat-label seat-selected" />
          <span>Twoje miejsce</span>
        </div>
        <div className="legend-item">
          <div className="seat-label" />
          <span>Miejsce normalne</span>
        </div>
        <div className="legend-item">
          <div className="seat-label seat-premium" />
          <span>Miejsce premium</span>
        </div>
        <div className="legend-item">
          <div className="seat-label seat-reserved" />
          <span>Miejsce zajęte</span>
        </div>
      </div>
    </div>
  );
}

function isSeatNormal(schema: Room, rowNumber: number, seatNumber: number) {
  return (
    schema.rows
      .find((row) => row.rowNumber === rowNumber)
      ?.seats.find((seat) => seat.seatNumber === seatNumber)?.type ===
    SeatType.Normal
  );
}

export default Seats;
