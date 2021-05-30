const request = require('request');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GRAPH_FACEBOOK_URI = 'https://graph.facebook.com/v10.0';

const sendRequest = (request_body) => {
  return new Promise((resolve, reject) => {
    request({
      uri: `${GRAPH_FACEBOOK_URI}/me/messages`,
      qs: { "access_token": PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body
    }, (err, res, body) => {
      if(request_body.sender_action) setTimeout(() => {}, 1000);
      if(err) reject(err); else resolve(body);
    });
  });
};

const getUserData = (sender_psid) => {
  return new Promise((resolve, reject) => {
    request({
      uri: `${GRAPH_FACEBOOK_URI}/${sender_psid}`,
      qs: { "access_token": PAGE_ACCESS_TOKEN },
      method: "GET",
    }, (err, res, body) => {
      if(err) reject(err);
      else resolve(body);
    });
  });
}

module.exports = {
  'SEND_REQUEST': sendRequest,
  'GET_USER_DATA':  getUserData
};
