import { useState } from "react";
import {
  useMediaQuery,
  Container,
  Tabs,
  Tab,
  useTheme,
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
import { getNextDays } from "./utils";

function Shows() {
  const nextDays = getNextDays(7);

  const [openIdx, setOpenIdx] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container sx={{ marginTop: { xs: 2, md: 6 } }}>
      <Tabs
        value={openIdx}
        onChange={(_, newValue) => {
          setOpenIdx(newValue);
        }}
        variant={isSmallScreen ? "scrollable" : "standard"}
        allowScrollButtonsMobile
        centered={!isSmallScreen}
      >
        {nextDays.map((day: ShowDate) => (
          <Tab
            key={day.day}
            label={`${day.day}.${day.month}.${day.year}`}
            sx={{ fontSize: "1rem" }}
          />
        ))}
      </Tabs>
      <ShowTabPanel date={nextDays[openIdx]} />
    </Container>
  );
}

const shows = [
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
  }
];

function ShowTabPanel({ date }: { date: ShowDate }) {
  const { isFetching, data } = useGetShowsByDateQuery(date) as {
    isFetching: boolean;
    data: {
      products: {
        id: number;
        title: string;
        description: string;
        category: string;
        stock: number;
        price: number;
        images: string[];
      }[];
    };
  };

  const products = data?.products;

  if (isFetching) {
    return <div>fetching...</div>;
  }
  return (
    <Box
      sx={{
        marginBottom: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{
            marginTop: { xs: 4, md: 7 },
            width: { xs: "95%", md: "90%" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
          raised
        >
          <CardMedia
            src={product.images[0]}
            component="img"
            sx={{
              width: { xs: "50vw", md: "12vw" },
              padding: "1rem",
              objectFit: "contain",
            }}
          />
          <CardContent
            sx={{
              width: "100%",
              paddingLeft: { xs: "1rem", md: "3rem" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: "2rem",
            }}
          >
            <Box sx={{ width: {xs: "100%", md: "70%"} }}>
              <Typography variant="h4" sx={{ marginBottom: { xs: 1, md: 3 } }}>
                {product.title}
              </Typography>
              <Typography variant="subtitle1">
                GATUNEK: {product.category}
              </Typography>
              <Typography variant="subtitle1">WIEK: {product.stock}</Typography>
              <Typography variant="subtitle1">
                CZAS: {product.price} MIN
              </Typography>
              <Typography variant="subtitle1">
                PRODUKCJA: {product.category}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: { xs: 1, md: 3 } }}>
                {product.description}
              </Typography>
            </Box>
            <Stack sx={{ width: {xs: "100%", md: "30%"} }} spacing={2}>
              {shows.map((show) => (
                <Link key={show.id} to={`/reserve/${show.id}`}>
                  <Button variant="outlined" fullWidth>
                    {show.time}
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
