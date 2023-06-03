import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../api/moviesApi";

function ShowDetails() {
  const { id } = useParams();
  const { isFetching, data } = useGetMovieByIdQuery(Number(id)) as {
    isFetching: boolean;
    data: {
      id: number;
      title: string;
      description: string;
      category: string;
      stock: number;
      price: number;
      images: string[];
    };
  };

  if (isFetching) {
    return <div>fetching...</div>;
  }

  return (
    <Container sx={{ marginTop: { xs: 2, md: 6 } }}>
      <div>show details {data.title}</div>
    </Container>
  );
}

export default ShowDetails;
