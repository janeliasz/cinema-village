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
} from "@mui/material";
import { Link } from "react-router-dom";
import { ShowDate, useGetShowsByDateQuery } from "../../api/showsApi";
import DaysTabs, { nextDays } from "../../components/DaysTabs";

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

export const screenings = [
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

function ShowsTabPanel({ date }: { date: ShowDate }) {
  const { isFetching, data } = useGetShowsByDateQuery(date) as {
    isFetching: boolean;
    data: {
      products: {
        id: number;
        title: string;
        description: string;
        brand: string;
        category: string;
        stock: number;
        price: number;
        images: string[];
      }[];
    };
  };

  const products = data?.products;

  const today = new Intl.DateTimeFormat("pl-PL", { dateStyle: "full" }).format(
    new Date(date.year, date.month, date.day),
  );

  if (isFetching) {
    return <div>fetching...</div>;
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
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{
            marginTop: { xs: 4, md: 7 },
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
          raised
        >
          <Link to={`/movies/${product.id}`}>
            <CardMedia
              src={product.images[0]}
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
                to={`/movies/${product.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography
                  variant="h4"
                  fontSize="1.75rem"
                  sx={{ marginBottom: { xs: 1, md: 3 } }}
                >
                  {product.title}
                </Typography>
              </Link>
              <Typography variant="subtitle1" fontSize="0.875rem">
                GATUNEK: {product.category}
              </Typography>
              <Typography variant="subtitle1" fontSize="0.875rem">
                WIEK: {product.stock}
              </Typography>
              <Typography variant="subtitle1" fontSize="0.875rem">
                CZAS: {product.price} MIN
              </Typography>
              <Typography variant="subtitle1" fontSize="0.875rem">
                PRODUKCJA: {product.category}
              </Typography>
              <Typography
                variant="body1"
                fontSize="0.875rem"
                sx={{ marginTop: { xs: 1, md: 3 } }}
              >
                {product.description}
              </Typography>
            </Box>
            <Stack sx={{ width: { xs: "100%", md: "30%" } }} spacing={2}>
              {screenings.map((screening) => (
                <Link key={screening.id} to={`/reserve/${screening.id}`}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ fontSize: "1rem" }}
                  >
                    {screening.time}
                  </Button>
                </Link>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Shows;
