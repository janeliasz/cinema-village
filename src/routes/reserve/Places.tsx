import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { useGetRoomByIdQuery } from "../../api/roomsApi";
import { Room, SeatType } from "./types";
import { useReservation } from "./ReservationProvider";

function Places({
  goPrev,
  goNext,
}: {
  goPrev: () => void;
  goNext: () => void;
}) {
  const { isFetching, data } = useGetRoomByIdQuery(1) as {
    isFetching: boolean;
    data: Room;
  };

  const { selectedSeats, selectSeat, deselectSeat } = useReservation();

  if (isFetching) {
    return <div>fetching...</div>;
  }

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "90%" },
      }}
    >
      <div>
        <div className="screen">EKRAN</div>

        {data.rows.map((row) => {
          let prevSeatPos = 0;

          return (
            <div
              key={`row${row.rowNumber}`}
              className={`row ${row.shift ? "row-shift" : ""}`}
            >
              {row.seats.map((seat) => {
                const emptySpace = Array.from(
                  { length: seat.positionInRow - prevSeatPos - 1 },
                  // eslint-disable-next-line react/self-closing-comp
                  (_, i) => <div key={`space${i}`} className="empty-space" />,
                );

                const isSelected = selectedSeats.find(
                  (selectedSeat) =>
                    selectedSeat.rowNumber === row.rowNumber &&
                    selectedSeat.seatNumber === seat.seatNumber,
                );

                prevSeatPos = seat.positionInRow;

                return (
                  <React.Fragment key={`seat${seat.seatNumber}`}>
                    {emptySpace}
                    <input
                      type="checkbox"
                      id={`row${row.rowNumber}-seat${seat.seatNumber}`}
                      className="seat"
                    />
                    <label
                      role="presentation"
                      htmlFor={`row${row.rowNumber}-seat${seat.seatNumber}`}
                      className={`seat-label
                      ${isSelected ? "seat-selected" : ""}
                      ${seat.reserved ? "seat-reserved" : ""}
                      ${seat.type === SeatType.Premium ? "seat-premium" : ""}`}
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        isSelected
                          ? deselectSeat(row.rowNumber, seat.seatNumber)
                          : selectSeat(row.rowNumber, seat.seatNumber);
                      }}
                    >
                      {seat.seatNumber}
                    </label>
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        sx={{ marginTop: { xs: "2rem" } }}
      >
        <Button variant="outlined" onClick={goPrev}>
          WSTECZ
        </Button>
        <Button variant="contained" onClick={goNext}>
          Dalej
        </Button>
      </Stack>
    </Box>
  );
}

export default Places;
