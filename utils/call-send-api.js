const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const callSendApi = (request_body, callback = null) => { 
  request({
    uri: "https://graph.facebook.com/v10.0/me/messages",
    qs: { "access_token": PAGE_ACCESS_TOKEN },
    method: "POST",
    json: request_body
  }, (err, res, body) => {
    if (!err) {
      if(callback) callback();
      console.log('message sent!', body)
    } else {
      console.error("Unable to send message:" + err);
    }
  });
};

const callGetUserDataApi = async (sender_psid) => {  
  return new Promise((resolve, reject) => {
    request({
      uri: `https://graph.facebook.com/v10.0/${sender_psid}`,
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
