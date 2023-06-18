import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";

const getNextDays = (numOfDays: number): string[] =>
  Array.from(Array(numOfDays).keys()).map((n) => {
    const day = new Date(new Date().getTime() + n * (24 * 60 * 60 * 1000));
    return day.toISOString().split("T")[0];
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
      {nextDays.map((day) => (
        <Tab
          key={day}
          label={day.split("-").reverse().join(".")}
          sx={{ fontSize: "1rem" }}
        />
      ))}
    </Tabs>
  );
}

export default DaysTabs;
