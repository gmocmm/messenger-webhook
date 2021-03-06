'use strict';

// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json()); // creates express http server
const request = require('request');
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.get('/setup', (req, res) => {
  setupGetStartedButtonPostback(res); 
  setupGrettingText(res); 
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {    
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

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => { 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

    // Gets the message. entry.messaging is an array, but 
    // will only ever contain one message, so we get index 0
    let webhook_event = entry.messaging[0];
    console.log(webhook_event);

    // Get the sender PSID
    let sender_psid = webhook_event.sender.id;

    // Send sender mark seen action
    setSenderAction(sender_psid, 'mark_seen');

    // Check if the event is a message or postback and
    // pass the event to the appropriate handler function
    // setTimeout(() => {
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);  
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    // }, 2000);
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
  let response;

  // Check if the message contains text
  if (received_message.text) {    

    // Create the payload for a basic text message
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;

    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  }
  
  // Sends the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  } else if (payload === 'GET_STARTED_BUTTON_POSTBACK_PAYLOAD') { 
    response = { "text": `Hello! How are you?` }
  }
  
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}


// Sends sender actions 
function setSenderAction(sender_psid, action) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action": action
  }

  // Send the HTTP request to the Messenger Platform
  request({
    uri: "https://graph.facebook.com/v10.0/me/messages",
    qs: { "access_token": PAGE_ACCESS_TOKEN },
    method: "POST",
    json: request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Sender action
  setSenderAction(sender_psid, 'typing_on');

  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response,
    "typing_off": "typing_off"
  }

  // Send the HTTP request to the Messenger Platform
  setTimeout(() => {
    request({
      uri: "https://graph.facebook.com/v10.0/me/messages",
      qs: { "access_token": PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    });
  }, 2000);
}


// Setup Get Started Button Postback
function setupGetStartedButtonPostback (res) {
  const messageData = {
    "get_started": {
      "payload": "GET_STARTED_BUTTON_POSTBACK_PAYLOAD"
    }
  };

  callRequestAPI(messageData, res);
} 

// Setup Gretting Text
function setupGrettingText (res) {
  const messageData = {
    "greeting": [
      {
        "locale":"default",
        "text":"Hello {{user_first_name}}! I'm a Chat bot that will assist to you!"
      }
    ]
  };

  callRequestAPI(messageData, res);
}

// Send request to API 
function callRequestAPI(messageData, res) {
  request({
    url: 'https://graph.facebook.com/v10.0/me/messenger_profile?access_token='+ PAGE_ACCESS_TOKEN,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    form: messageData
  }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
          res.send(body);
      } else { 
          res.send(body);
      }
  });
}

// Sets server port and logs message on success
const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Webhook is listening at port ${port}`));
