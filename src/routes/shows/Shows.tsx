import { useState } from "react";
import {
  Container,
  Card,
  CardMedia,
  Box,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetShowsByDateQuery } from "../../api/showsApi";
import DaysTabs, { nextDays } from "../../components/DaysTabs";
import { Movie } from "../../api/moviesApi";
import NoScreenings from "../../components/NoScreenings";

function Shows() {
  const [openDayTab, setOpenDayTab] = useState(0);

  return (
    <Container sx={{ marginTop: { xs: 2, md: 6 } }}>
      <DaysTabs openIdx={openDayTab} onChange={setOpenDayTab} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: { xs: 4, md: 7 },
          marginBottom: "50vh",
        }}
      >
        <ShowsTabPanel date={nextDays[openDayTab]} />
      </Box>
    </Container>
  );
}

function ShowsTabPanel({ date }: { date: string }) {
  const { isFetching, data } = useGetShowsByDateQuery(date) as {
    isFetching: boolean;
    data: (Movie & { screenings: { screeningId: number; time: string }[] })[];
  };

  const today = new Intl.DateTimeFormat("pl-PL", { dateStyle: "full" }).format(
    new Date(date),
  );

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "90%" },
      }}
    >
      <Typography
        variant="h6"
        sx={{ alignSelf: "flex-start", fontWeight: "bold" }}
      >
        {today.toUpperCase()}
      </Typography>
      {data.map(({ screenings, ...movie }) => (
        <Card
          key={movie.id}
          sx={{
            marginTop: { xs: 4, md: 7 },
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
          raised
        >
          <Link to={`/movies/${movie.id}`}>
            <CardMedia
              src={movie.posterPath}
              component="img"
              sx={{
                width: { xs: "50vw", md: "12rem" },
                height: { xs: "auto", md: "15rem" },
                padding: "1rem",
                objectFit: "cover",
              }}
            />
          </Link>
          <CardContent
            sx={{
              width: "100%",
              paddingLeft: { xs: "1rem", md: "3rem" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: "2rem",
            }}
          >
            <Box sx={{ width: { xs: "100%", md: "70%" } }}>
              <Link
                to={`/movies/${movie.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography
                  variant="h4"
                  fontSize="1.75rem"
                  sx={{ marginBottom: { xs: 1, md: 3 } }}
                >
                  {movie.title}
                </Typography>
              </Link>
              <Typography variant="subtitle1" fontSize="0.875rem">
                REŻYSERIA: {movie.director}
              </Typography>
              <Typography variant="subtitle1" fontSize="0.875rem">
                ROK: {movie.releaseDate.substring(0, 4)}
              </Typography>
              <Typography variant="subtitle1" fontSize="0.875rem">
                CZAS: {movie.runtime} MIN
              </Typography>
              <Typography
                variant="body1"
                fontSize="0.875rem"
                sx={{ marginTop: { xs: 1, md: 3 } }}
              >
                {movie.overview}
              </Typography>
            </Box>
            <Stack sx={{ width: { xs: "100%", md: "30%" } }} spacing={2}>
              {screenings.map((screening) => (
                <Link
                  key={screening.screeningId}
                  to={`/reserve/${screening.screeningId}`}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ fontSize: "1rem" }}
                  >
                    {screening.time.slice(0, -3)}
                  </Button>
                </Link>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
      {data.length === 0 && (
        <Box sx={{ marginTop: { xs: 2 } }}>
          <NoScreenings />
        </Box>
      )}
    </Box>
  );
}

export default Shows;
