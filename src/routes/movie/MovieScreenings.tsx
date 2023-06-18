import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import DaysTabs, { nextDays } from "../../components/DaysTabs";
import { useGetShowsByDateQuery } from "../../api/showsApi";
import { Movie } from "../../api/moviesApi";
import NoScreenings from "../../components/NoScreenings";

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
  const { isFetching, data } = useGetShowsByDateQuery(date) as {
    isFetching: boolean;
    data: (Movie & { screenings: { screeningId: number; time: string }[] })[];
  };

  const screenings = data?.find((movie) => movie.id === movieId)?.screenings;

  if (isFetching) {
    return <div>fetching...</div>;
  }

  return screenings ? (
    <Stack direction="row" spacing={2} justifyContent="center">
      {screenings.map((screening) => (
        <Link
          key={screening.screeningId}
          to={`/reserve/${screening.screeningId}`}
        >
          <Button variant="outlined" fullWidth sx={{ fontSize: "1rem" }}>
            {screening.time.slice(0, -3)}
          </Button>
        </Link>
      ))}
    </Stack>
  ) : (
    <Box sx={{ marginTop: { xs: 2 } }}>
      <NoScreenings />
    </Box>
  );
}

export default MovieScreenings;
