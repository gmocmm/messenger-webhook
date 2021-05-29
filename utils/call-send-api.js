const request = require('request');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GRAPH_FACEBOOK_URI = 'https://graph.facebook.com/v10.0';

const callSendApi = (request_body) => {
  return new Promise((resolve, reject) => {
    request({
      uri: `${GRAPH_FACEBOOK_URI}/me/messages`,
      qs: { "access_token": PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body
    }, (err, res, body) => {
      if(err) reject(err);
      else resolve(body);
    });
  });
};

const callGetUserDataApi = (sender_psid) => {
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
  'CALL_SEND_API': callSendApi,
  'CALL_GET_USER_DATA_API':  callGetUserDataApi
};
