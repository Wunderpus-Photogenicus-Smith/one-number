import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';

const dataFromJSON = require('../json_from_plaid/investments-holdings-get.json');

const AssetsCard = () => {
  // const [assets, setAssests] = useState('')

  // useEffect(() => {
  //    fetch("investments-holdings-get.json")
  //         .then(res => {
  //             setAssests(res.holdings);
  //             console.log(assets)
  //         })
  //         .catch(err => console.log(err));
  // }, []);
  console.log(dataFromJSON.holdings);
  const accounts = dataFromJSON.holdings.accounts;
  const holdings = dataFromJSON.holdings.holdings;

  const amassTotals = () => {
    let totals = 0;
    accounts.forEach((el) => {
      totals += el.balances.current;
    });
    return Number(String(totals).split('').slice(0, -2).join(''));
  };

  const total = amassTotals();

  console.log(total);
  return (
    <Card>
      <Card.Title className="p-2">Assets</Card.Title>
      <Card.Body>
        <Card.Text> Asset1</Card.Text>
        <Card.Text> Asset2</Card.Text>
        <Card.Text> Asset3</Card.Text>
        <Card.Text> Asset4</Card.Text>
        <Card.Text> Asset5</Card.Text>
        <Card.Text> Asset6</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  );
};

export default AssetsCard;
