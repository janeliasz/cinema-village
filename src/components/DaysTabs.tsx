import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { ShowDate } from "../api/showsApi";

const getNextDays = (numOfDays: number): ShowDate[] =>
  Array.from(Array(numOfDays).keys()).map((n) => {
    const day = new Date(new Date().getTime() + n * (24 * 60 * 60 * 1000));
    return {
      year: day.getFullYear(),
      month: day.getMonth(),
      day: day.getDate(),
    };
  });

export const nextDays = getNextDays(7);

function DaysTabs({
  openIdx,
  onChange,
}: {
  openIdx: number;
  onChange: (newValue: number) => void;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Tabs
      value={openIdx}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      variant={isSmallScreen ? "scrollable" : "standard"}
      allowScrollButtonsMobile
      centered={!isSmallScreen}
    >
      {nextDays.map((day: ShowDate) => (
        <Tab
          key={day.day}
          label={`${day.day}.${day.month + 1}.${day.year}`}
          sx={{ fontSize: "1rem" }}
        />
      ))}
    </Tabs>
  );
}

export default DaysTabs;
