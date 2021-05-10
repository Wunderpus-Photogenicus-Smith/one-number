import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import { usePlaidLink } from 'react-plaid-link';

const SpaceFiller = (props) => {
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   const script = document.createElement('script');
  //   script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
  //   script.async = true;
  //   script.onload = () => this.scriptLoaded();

  //   document.body.appendChild(script);
  //   console.log(Plaid);
  // });

  // const onSuccess = useCallback(
  //   (token, metadata) => console.log('onSuccess', token, metadata),
  //   []
  // );

  // const onEvent = useCallback(
  //   (eventName, metadata) => console.log('onEvent', eventName, metadata),
  //   []
  // );

  // const onExit = useCallback(
  //   (err, metadata) => console.log('onExit', err, metadata),
  //   []
  // );

  // const config = {
  //   token: props.token,
  //   onSuccess,
  //   onEvent,
  //   onExit,
  //   // –– optional parameters
  //   // receivedRedirectUri: props.receivedRedirectUri || null,
  //   // ...
  // };

  // const { open, ready, error } = usePlaidLink(config);
  return (
    <>
      {'test'}
      {/* <Button onClick={() => open()} disabled={!ready || error}>
        Open Plaid Link
      </Button> */}
    </>
  );
};
export default SpaceFiller;
