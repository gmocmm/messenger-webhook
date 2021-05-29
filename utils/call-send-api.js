const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const callSendApi = (request_body, callback = null) => {  
  console.log(request_body, '*******');

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

module.exports = {
  'CALL_SEND_API': callSendApi
};
