import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import DaysTabs, { nextDays } from "../../components/DaysTabs";

const screenings = [
  {
    id: 1,
    time: "12:00",
  },
  {
    id: 2,
    time: "14:00",
  },
  {
    id: 3,
    time: "16:00",
  },
];

function MovieScreenings({ movieId }: { movieId: number }) {
  const [openDayTab, setOpenDayTab] = useState(0);

  return (
    <>
      <DaysTabs openIdx={openDayTab} onChange={setOpenDayTab} />
      <Box sx={{ marginTop: { xs: 2, md: 3 } }}>
        <MovieScreeningsTabPanel
          movieId={movieId}
          date={nextDays[openDayTab]}
        />
      </Box>
    </>
  );
}

function MovieScreeningsTabPanel({
  movieId,
  date,
}: {
  movieId: number;
  date: string;
}) {
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="center">
        {screenings.map((screening) => (
          <Link key={screening.id} to={`/reserve/${screening.id}`}>
            <Button variant="outlined" fullWidth sx={{ fontSize: "1rem" }}>
              {screening.time}
            </Button>
          </Link>
        ))}
      </Stack>
      {movieId}, {date}
    </>
  );
}

export default MovieScreenings;
