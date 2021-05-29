const callSendApi = (request_body) => {
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

export default {
  'CALL_SEND_API': callSendApi
}