import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../api/moviesApi";

function MovieInfo() {
  const { id } = useParams();
  const { isFetching, data } = useGetMovieByIdQuery(Number(id)) as {
    isFetching: boolean;
    data: {
      id: number;
      title: string;
      description: string;
      brand: string;
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 1, md: 3 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
          }}
        >
          <img src={data.images[0]} alt={data.title} width="100%" />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "60%" } }}>
          <Typography
            sx={{
              typography: { xs: "h5", md: "h4" },
              marginBottom: { xs: 1, md: 3 },
            }}
          >
            {data.title}
          </Typography>
          {[data.category, data.stock, data.price, data.category].map(
            (detail, idx) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ fontSize: { xs: "1rem", md: "1.125rem" } }}
                >
                  {detailsTitles1[idx]}:
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: { xs: "1rem", md: "1.125rem" } }}
                >
                  {detail}
                </Typography>
              </Box>
            ),
          )}
          <Typography
            variant="body1"
            sx={{
              marginTop: { xs: 1, md: 3 },
              fontSize: { xs: "1rem", md: "1.125rem" },
            }}
          >
            {data.description}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: { xs: 3, md: 6 },
        }}
      >
        {[data.brand, data.category, `${data.category}, ${data.brand}`].map(
          (detail, idx) => (
            <Box
              key={detail}
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  letterSpacing: "0.175rem",
                }}
              >
                {detailsTitles2[idx]}:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  letterSpacing: "0.175rem",
                }}
              >
                {detail}
              </Typography>
            </Box>
          ),
        )}
      </Box>

      <Box sx={{ marginTop: { xs: 3, md: 4 } }}>
        <DummyDesc />
      </Box>
    </>
  );
}

const detailsTitles1 = ["GATUNEK", "WIEK", "CZAS", "PRODUKCJA"];
const detailsTitles2 = ["REŻYSERIA", "SCENARIUSZ", "OBSADA"];

function DummyDesc() {
  return (
    <>
      <Typography
        variant="subtitle1"
        color="primary"
        sx={{
          marginTop: { xs: 3, md: 4 },
          fontSize: { xs: "1rem", md: "1.125rem" },
          letterSpacing: "0.175rem",
        }}
      >
        OPIS:
      </Typography>
      <Typography variant="body1" letterSpacing="0.1rem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi odio
        earum est iste mollitia eaque magni nostrum! Officia atque quae
        aspernatur excepturi! Consectetur nisi voluptates hic, dolore blanditiis
        dicta quos velit laborum iure unde exercitationem ducimus facere neque
        harum itaque laudantium pariatur, ab nesciunt illo nihil odio fugiat!
        Accusantium nemo autem ullam recusandae eligendi id dolores repudiandae
        blanditiis, animi perspiciatis aliquid reprehenderit non. Delectus
        dolores vel sed id obcaecati! Similique atque ad voluptatibus fuga nobis
        blanditiis incidunt, voluptas perspiciatis accusamus quam deleniti
        debitis, maxime quae sed dolore iusto eum tempora enim facilis amet
        labore harum nam, provident ipsam! Fuga, mollitia.
      </Typography>
      <Typography
        variant="body1"
        letterSpacing="0.1rem"
        sx={{ marginTop: { xs: 0.5, md: 1 } }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
        excepturi, a sed provident nam voluptatum recusandae cupiditate
        perferendis maxime vitae iusto omnis explicabo culpa voluptatibus
        molestias architecto consectetur rem facere? Numquam eius vel
        dignissimos odio id eos illo soluta sunt maxime, facere incidunt neque
        autem deleniti molestias deserunt nesciunt architecto velit voluptatem
        laboriosam doloremque ab alias cupiditate? Earum exercitationem
        laboriosam excepturi nostrum magni sunt, quod voluptas dolorum? Eaque
        modi similique, ratione ducimus cum voluptate distinctio tempora beatae
        perspiciatis est ipsam repellendus ea voluptates facilis ipsa, debitis
        qui deleniti, dignissimos quae corrupti praesentium molestiae quod?
        Optio, voluptatem. Vel ullam repudiandae omnis quos non saepe tenetur
        quis. Recusandae ea repudiandae nemo esse assumenda, tempore totam nulla
        incidunt quas debitis, aperiam quos dolor veritatis sit. Labore placeat
        eius itaque libero provident repellendus quod. Voluptas asperiores,
        commodi, explicabo delectus possimus dolores illum corrupti dignissimos
        nisi nihil aliquam numquam quaerat itaque repudiandae. Quaerat, odit
        autem?
      </Typography>
    </>
  );
}

export default MovieInfo;