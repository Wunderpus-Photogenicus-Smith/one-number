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

  const accounts = dataFromJSON.holdings.accounts;
  const holdings = dataFromJSON.holdings.holdings;
  const securities = dataFromJSON.holdings.securities;

  const grabIdsFromHoldings = () => {
    return holdings.reduce((acc, currHolding) => {
      acc.push({
        id: currHolding.security_id,
        value: currHolding.institution_value,
      });
      return acc;
    }, []);
  };

  const securityIds = grabIdsFromHoldings();

  const grabSecuritiesNameAndId = () => {
    return securities.reduce((acc, currSecurity, index) => {
      const evaluatedSecurity = {
        name: currSecurity.name,
        id: currSecurity.security_id,
      };

      acc.push(evaluatedSecurity);
      return acc;
    }, []);
  };

  const names = grabSecuritiesNameAndId();

  const groupSecuritiesWithHoldings = (securityIds, names) => {
    const finalSecurities = [];
    names.forEach((el) => {
      for (let i = 0; i < securityIds.length; i++) {
        const id = securityIds[i];

        if (el.id === id.id) {
          finalSecurities.push({ name: el.name, value: id.value });
        }
      }
    });

    return finalSecurities;
  };

  const groupedSecurities = groupSecuritiesWithHoldings(securityIds, names);

  const amassTotals = () => {
    let totals = 0;
    accounts
      .filter((el) => el.type === 'depository' || el.type === 'investment')
      .forEach((el) => {
        totals += el.balances.current;
      });
    return '$' + String(totals).split('').slice(0, -2).join('');
  };

  const total = amassTotals();

  console.log(total);
  return (
    <Card>
      <Card.Title className="p-2">Assets</Card.Title>
      <Card.Body>
        <Card.Body>
          <b>Accounts:</b>
          {accounts
            .filter(
              (el) => el.type === 'depository' || el.type === 'investment'
            )
            .map((asset) => {
              return [
                <Card.Text>
                  {asset.name} {asset.balances.current}
                </Card.Text>,
              ];
            })}
          <b>Holdings:</b>
          {groupedSecurities.map((asset) => {
            return [
              <Card.Text>
                {asset.name} {asset.value}
              </Card.Text>,
            ];
          })}
          <Card.Text>
            <b>Balance:</b>
          </Card.Text>
        </Card.Body>

        <Card.Body>{`Total: ${total}`}</Card.Body>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  );
};

export default AssetsCard;
