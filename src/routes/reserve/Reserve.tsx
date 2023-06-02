import { useState } from "react";
import { Box, Container, Step, StepLabel, Stepper } from "@mui/material";

import Tickets, { SelectedTicket, TicketType } from "./Tickets";
import Summary from "./Summary";
import Places from "./Places";

const steps = [
  { label: "Bilety" },
  { label: "Miejsca" },
  { label: "Podsumowanie" },
];

function Reserve() {
  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((prev) => prev + 1);
  const goPrev = () => setActiveStep((prev) => prev - 1);

  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([
    { type: TicketType.Normal, numOfTickets: 2 },
  ]);

  const stepContentSwitch = () => {
    switch (activeStep) {
      case 0:
        return (
          <Tickets
            goNext={goNext}
            selectedTickets={selectedTickets}
            setSelectedTickets={setSelectedTickets}
          />
        );
      case 1:
        return <Places goPrev={goPrev} goNext={goNext} />;
      case 2:
        return <Summary goPrev={goPrev} />;
      default:
        return <div>error</div>;
    }
  };

  return (
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
          marginTop: { xs: 2, md: 6 },
        }}
      >
        {stepContentSwitch()}
      </Box>
    </Container>
  );
}

export default Reserve;
