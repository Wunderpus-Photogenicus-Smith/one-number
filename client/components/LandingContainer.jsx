import React from 'react';
import { Jumbotron, Button, Container } from 'react-bootstrap';
const LandingContainer = () => {
  return (
    <Container>
      <Jumbotron>
        <h1>Welcome!</h1>

        <p>
          This is One Number, a simple web app that uses the Plaid api to pull
          your real time financial data. This allows you to get a better picture
          of your financial health, narrowed down to one number.
        </p>
        <p>
          <Button href="/auth/google" variant="primary">
            Get Started
          </Button>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default LandingContainer;
