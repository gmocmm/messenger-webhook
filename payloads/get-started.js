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
      "message": "¡Hola Guillermo! Soy Bot Jr. 🤖 y me encantan las hamburguesas 🍔 como a ti.",
      "typing_off": "typing_off"
    });
  }, 1000);

  // Are you ready? Message
  SET_SENDER_ACTION(sender_psid, 'typing_on');
  setTimeout(() => {
    CALL_SEND_API({
      "recipient": {
        "id": sender_psid
      },
      "message": "¿Listo? Estoy aquí para ayudarte.",
      "typing_off": "typing_off"
    });
  }, 1000);

  // Instrucion Message 
  SET_SENDER_ACTION(sender_psid, 'typing_on');
  setTimeout(() => {
    CALL_SEND_API({
      "recipient": {
        "id": sender_psid
      },
      "message": "Selecciona una opción. 🤓",
      "typing_off": "typing_off"
    });
  }, 1000);
};

export default {
  'HANDLE_GET_STARTED_PAYLOAD': handleGetStartedPayload,
  'GET_STARTED_PAYLOAD' : 'GET_STARTED_BUTTON_POSTBACK_PAYLOAD'
}