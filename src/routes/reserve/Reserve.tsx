import { useState } from "react";
import { Box, Container, Step, StepLabel, Stepper } from "@mui/material";

import Tickets from "./Tickets";
import PersonalInfo from "./PersonalInfo";
import Seats from "./Seats";
import ReservationProvider from "./ReservationProvider";

const steps = [
  { label: "Bilety" },
  { label: "Miejsca" },
  { label: "Podsumowanie" },
];

function Reserve() {
  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((prev) => prev + 1);
  const goPrev = () => setActiveStep((prev) => prev - 1);

  const stepContentSwitch = () => {
    switch (activeStep) {
      case 0:
        return <Tickets goNext={goNext} />;
      case 1:
        return <Seats goPrev={goPrev} goNext={goNext} />;
      case 2:
        return <PersonalInfo goPrev={goPrev} />;
      default:
        return <div>error</div>;
    }
  };

  return (
    <ReservationProvider>
      <Container sx={{ marginTop: { xs: 2, md: 6 } }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(({ label }) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: { xs: 6, md: 8 },
          }}
        >
          {stepContentSwitch()}
        </Box>
      </Container>
    </ReservationProvider>
  );
}

export default Reserve;
