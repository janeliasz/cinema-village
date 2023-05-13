import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ShowDate, useGetShowsByDateQuery } from "../../api/showsApi";
import { getNextDays } from "./utils";

function ShowsTabs() {
  const nextDays = getNextDays(7);

  const [openIdx, setOpenIdx] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ marginTop: { xs: 2, md: 6 } }}>
      <Tabs
        value={openIdx}
        onChange={(_, newValue) => {
          setOpenIdx(newValue);
        }}
        variant={isSmallScreen ? "scrollable" : "standard"}
        allowScrollButtonsMobile
        centered={!isSmallScreen}
      >
        {nextDays.map((day: ShowDate, idx: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tab key={idx} label={`${day.day}.${day.month}.${day.year}`} />
        ))}
      </Tabs>
      <ShowTabPanel date={nextDays[openIdx]} />
    </Box>
  );
}

function ShowTabPanel({ date }: { date: ShowDate }) {
  const { isFetching, data } = useGetShowsByDateQuery(date);

  if (isFetching) {
    return <div>fetching...</div>;
  }
  return <div>{data.title}</div>;
}

export default ShowsTabs;
