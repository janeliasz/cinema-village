import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import MovieScreenings from "./MovieScreenings";
import MovieInfo from "./MovieInfo";

function Movie() {
  const { id } = useParams();

  return (
    <Container sx={{ marginTop: { xs: 2, md: 6 }, marginBottom: "50vh" }}>
      <MovieInfo />

      <Box sx={{ marginTop: { xs: 2, md: 6 } }}>
        <MovieScreenings movieId={Number(id)} />
      </Box>
    </Container>
  );
}

export default Movie;
