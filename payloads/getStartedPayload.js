const { SEND_REQUEST, GET_USER_DATA, DELAY } = require('../utils/callGraphApi');

const getStartedPayloadHandler = async (sender_psid) => {
  let userData = await GET_USER_DATA(sender_psid);
  userData = JSON.parse(userData);

  // ************************ */

  // Typing On
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  // Message
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `¡Hola ${userData.first_name}! Soy Bot Jr. 🤖 y me encantan las hamburguesas 🍔 como a ti.` },
  });

  // ************************ */

  // Typing On
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  // Message
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": "¿Listo? Estoy aquí para ayudarte." },
  });

  // ************************ */

  // Typing On
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 

  // Message
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": "Selecciona una opción. 🤓" },
  });

  // ************************ */
};

module.exports = {
  'GET_STARTED_PAYLOAD_HANDLER': getStartedPayloadHandler,
  'GET_STARTED_PAYLOAD_NAME' : 'GET_STARTED_BUTTON_POSTBACK_PAYLOAD'
}