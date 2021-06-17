const sendDisagreementPayloadHandler = (sender_psid, session) => {
  session = {
    ...session,
    context: {
      payload: 'SEND_DISAGREEMENT_PAYLOAD_NAME'
    }
  };

  console.log(session, '*************');
  return session;
}

module.exports = {
  'SEND_DISAGREEMENT_PAYLOAD_HANDLER': sendDisagreementPayloadHandler,
  'SEND_DISAGREEMENT_PAYLOAD_NAME' : 'SEND_DISAGREEMENT_BUTTON_POSTBACK_PAYLOAD'
}