import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';



const AssetsCard = () => {
const [assets, setAssests] = useState('')
  
    useEffect(() => {
       fetch("investments-holdings-get.json")
            .then(res => {
                setAssests(res.data.holdings); 
                
            })
            .catch(err => console.log(err));
    }, []);

  return (
    <Card>
      <Card.Title className='p-2'>Assets</Card.Title>
      <Card.Body>
        {assets.holdings.accounts
          .filter(el.type === 'depository' || el.type === 'investment')
          .map(asset => {
            return <Card.text>{asset.name}</Card.text>
          })}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  );
};

export default AssetsCard;
