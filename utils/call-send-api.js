const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const callSendApi = (request_body) => {
  console.log(request_body, PAGE_ACCESS_TOKEN);
  
  request({
    uri: "https://graph.facebook.com/v10.0/me/messages",
    qs: { 
      "access_token": PAGE_ACCESS_TOKEN 
    },
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

module.exports = {
  'CALL_SEND_API': callSendApi
}