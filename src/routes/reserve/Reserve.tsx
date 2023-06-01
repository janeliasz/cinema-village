import { useState } from "react";
import { Container, Step, StepLabel, Stepper } from "@mui/material";

import Tickets from "./Tickets";

const steps = [
  { label: "Bilety" },
  { label: "Miejsca" },
  { label: "Podsumowanie" },
];

function Reserve() {
  const [activeStep, setActiveStep] = useState(0);

  const stepContentSwitch = () => {
    switch (activeStep) {
      case 0:
        return <Tickets goNext={() => setActiveStep((prev) => prev + 1)} />;
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
      {stepContentSwitch()}
    </Container>
  );
}

export default Reserve;
