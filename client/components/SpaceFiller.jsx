import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { usePlaidLink } from "react-plaid-link";
import { Helmet } from "react-helmet";

const SpaceFiller = (props) => {
  const createPlaidStuff = () => {
<<<<<<< HEAD

    fetch('/plaid/get_link_token')
      .then(response => response.json())
      .then(({linkToken}) => {
        
=======
    // console.log(Plaid);
    fetch("/plaid/get_link_token")
      .then((response) => response.json())
      .then(({ linkToken }) => {
>>>>>>> dev
        const handler = Plaid.create({
          token: linkToken,
          onSuccess: (public_token, metadata) => {
            console.log("on success");
            fetch("/plaid/plaid_token_exchange", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                public_token,
                // metadata,
              }),
            })
              .then((data) => data.json())
              .then((resp) => console.log(resp))
              .catch((e) => console.log(e));
          },
          onLoad: () => {},
          onExit: (error, metadata) => {
      
            // Save data from the onExit handler
            supportHandler.report({
              error: error,
              institution: metadata.institution,
              link_session_id: metadata.link_session_id,
              plaid_request_id: metadata.request_id,
              status: metadata.status,
            });
          },
          onEvent: (eventName, metadata) => {
            // send event and metadata to self-hosted analytics
<<<<<<< HEAD
      
=======
            // console.log('event happened');
            // console.log(eventName);
            // console.log(metadata);
>>>>>>> dev
          },
          receivedRedirectUri: null,
        });
        handler.open();
        // sethandlerFunc(handler);
      });
  };

  return (
    <div>
<<<<<<< HEAD
            <Helmet>
              <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js" type="text/javascript" />
            </Helmet>
    {/* <button onClick={() => console.log('test')}>button</button> */}
      <Button type='submit' onClick={createPlaidStuff} variant="outline-info"  bg="dark" variant="dark">
=======
      <Helmet>
        <script
          src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
          type="text/javascript"
        />
      </Helmet>
      {/* <button onClick={() => console.log('test')}>button</button> */}
      <Button type="submit" onClick={createPlaidStuff}>
>>>>>>> dev
        Connect a bank account
      </Button>
    </div>
  );
};
export default SpaceFiller;
