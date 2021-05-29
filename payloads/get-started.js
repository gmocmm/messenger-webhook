const { SET_SENDER_ACTION } = require('./../utils/sender-action');
const { CALL_SEND_API, CALL_GET_USER_DATA_API } = require('./../utils/call-send-api');

const handleGetStartedPayload = async (sender_psid) => {
  let userData = await CALL_GET_USER_DATA_API(sender_psid);
  userData = JSON.parse(userData);

  // Welcome Message
  // await SET_SENDER_ACTION(sender_psid, 'typing_on')

  
  setTypingOn();
  await CALL_SEND_API({
    "recipient": { "id": sender_psid },
    "message": { "text": `¡Hola ${userData.first_name}! Soy Bot Jr. 🤖 y me encantan las hamburguesas 🍔 como a ti.` },
  });

  /*
  setTimeout(() => {
    CALL_SEND_API({
      "recipient": { "id": sender_psid },
      "message": { "text": `¡Hola ${userData.first_name}! Soy Bot Jr. 🤖 y me encantan las hamburguesas 🍔 como a ti.` },
    }, () => {
      // Are you ready? Message
      SET_SENDER_ACTION(sender_psid, 'typing_on');
      setTimeout(() => {
        CALL_SEND_API({
          "recipient": { "id": sender_psid },
          "message": { "text": "¿Listo? Estoy aquí para ayudarte." },
        }, () => {
          // Instrucion Message 
          SET_SENDER_ACTION(sender_psid, 'typing_on');
          setTimeout(() => {
            CALL_SEND_API({
              "recipient": { "id": sender_psid },
              "message": { "text": "Selecciona una opción. 🤓" },
            });
          }, 1000);
        });
      }, 1000);
    });
  }, 1000);*/
};

const setTypingOn = async () => {
  await CALL_SEND_API({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  });
}

module.exports = {
  'HANDLE_GET_STARTED_PAYLOAD': handleGetStartedPayload,
  'GET_STARTED_PAYLOAD' : 'GET_STARTED_BUTTON_POSTBACK_PAYLOAD'
}