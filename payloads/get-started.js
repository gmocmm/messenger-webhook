const { SET_SENDER_ACTION } = require('./../utils/sender-action');
const { CALL_SEND_API } = require('./../utils/call-send-api');

const handleGetStartedPayload = (sender_psid) => {
  // Welcome Message
  SET_SENDER_ACTION(sender_psid, 'typing_on');

  setTimeout(() => {
    CALL_SEND_API({
      "recipient": {
        "id": sender_psid
      },
      "message": { "text": "¡Hola {{name}}! Soy Bot Jr. 🤖 y me encantan las hamburguesas 🍔 como a ti." },
      "typing_off": "typing_off"
    });

    SET_SENDER_ACTION(sender_psid, 'typing_on');
  }, 1000);

  // Are you ready? Message
  
  setTimeout(() => {
    CALL_SEND_API({
      "recipient": {
        "id": sender_psid
      },
      "message": { "text": "¿Listo? Estoy aquí para ayudarte." },
      "typing_off": "typing_off"
    });

    SET_SENDER_ACTION(sender_psid, 'typing_on');
  }, 2000);

  // Instrucion Message 
  setTimeout(() => {
    CALL_SEND_API({
      "recipient": {
        "id": sender_psid
      },
      "message": { "text": "Selecciona una opción. 🤓" },
      "typing_off": "typing_off"
    });
  }, 3000);
};

module.exports = {
  'HANDLE_GET_STARTED_PAYLOAD': handleGetStartedPayload,
  'GET_STARTED_PAYLOAD' : 'GET_STARTED_BUTTON_POSTBACK_PAYLOAD'
}