const { CALL_SEND_API } = require('./call-send-api');

const setSenderAction = async (sender_psid, action) => {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action": action
  };

  await CALL_SEND_API(request_body);
}

module.exports = {
  'SET_SENDER_ACTION': setSenderAction
};