import React from 'react';
import { CardGroup, Container, Row } from 'react-bootstrap';
import AssetsCard from './AssetsCard.jsx';
import LiabilitiesCard from './LiabilitiesCard.jsx';
import NetWorthCard from './NetWorthCard.jsx';

const CardsContainer = () => {
  return (
    <Container>
      <Row className='m-2'>
        <CardGroup>
          <AssetsCard />
          <LiabilitiesCard />
          <NetWorthCard />
        </CardGroup>
      </Row>
    </Container>
  );
};

export default CardsContainer;
