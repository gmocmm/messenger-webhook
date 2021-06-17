'use strict';

// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');
const {Wit, log} = require('node-wit');

const { GET_STARTED_PAYLOAD_NAME, GET_STARTED_PAYLOAD_HANDLER } = require('./payloads/getStartedPayload');
const { SEND_DISAGREEMENT_PAYLOAD_NAME, SEND_DISAGREEMENT_PAYLOAD_HANDLER } = require('./payloads/sendDisagreementPayload');
const { SEND_REQUEST } = require('./services/callGraphApi');

const app = express().use(bodyParser.json()); // creates express http server
require('dotenv').config();


// ----------------------------------------------------------------------------
// Wit.ai bot specific code

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}

// Wit.ai parameters
const WIT_TOKEN = 'JTJ7HCYEJBRWH2QHT7CBCH3XBWAEK23U';

// Setting up our bot
const wit = new Wit({
  accessToken: WIT_TOKEN,
  logger: new log.Logger(log.INFO)
});

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

app.post('/webhook', (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    
    body.entry.forEach(async (entry) => {
      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;

      // Send sender mark seen action
      await SEND_REQUEST({
        "recipient": { "id": sender_psid },
        "sender_action": "mark_seen"  
      }); 

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);  
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Handles messages events
function handleMessage(sender_psid, received_message) {
  console.log(received_message, '*****');
  wit.message(received_message).then(({entities, intents, traits}) => {
    // You can customize your response using these
    console.log(intents);
    console.log(entities);
    console.log(traits);
  })
  .catch((err) => {
    console.error('Oops! Got an error from Wit: ', err.stack || err);
  })
};

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case GET_STARTED_PAYLOAD_NAME:
      GET_STARTED_PAYLOAD_HANDLER(sender_psid);
      break;
    
    case SEND_DISAGREEMENT_PAYLOAD_NAME: 
      SEND_DISAGREEMENT_PAYLOAD_HANDLER(sender_psid);
      break;

    default:
      break;
  }

  return true;
};

// Sets server port and logs message on success
const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Webhook is listening at port ${port}`));
