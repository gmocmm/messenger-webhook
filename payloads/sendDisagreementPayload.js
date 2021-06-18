const { SEND_REQUEST, GET_USER_DATA } = require('../services/callGraphApi');

const sendDisagreementPayloadName = 'SEND_DISAGREEMENT_BUTTON_POSTBACK_PAYLOAD'
const sendDisagreementPayloadHandler = (sender_psid, session) => {
  startedPayload();
  requestName();
  
  if(!session.context.step) {
    startedPayload();
    requestName();
    session = generateSesssion(session, 1);
    return session;
  }

  if(session.context.step == 1) {
    requestCityState();
    session = generateSesssion(session, 2);
    return session;
  }

  if(session.context.step == 2) {
    requestIdRestaurant();
    session = generateSesssion(session, 3);
    return session;
  }
}

const startedPayload = () => {
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
    "message": { "text": `${userData.first_name}, gracias por tomarte el tiempo en escribirnos, te ayudaremos a dar el seguimiento pertinente a tu situación.` },
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
    "message": { "text": `A continuación, te pediremos algunos datos para poder completar el reporte:` },
  });

  // ************************ */
}

const requestName = () => {
  // ************************ */

  // Typing On
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  // Message
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `¿Cúal es tu nombre completo?` },
  });

  // ************************ */
}

const requestCityState = () => {
  // ************************ */

  // Typing On
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  // Message
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `Escriba la Ciudad y Estado donde tuvó el problema:` },
  });

  // ************************ */
}

const requestIdRestaurant = () => {
  // ************************ */

  // Typing On
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  // Message
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `Id de restaurante. Lo puedes encontrar en tu ticket de compra. Empieza con 110 _ _ _ _`},
  });

  // ************************ */
}



const generateSesssion = (session, step) => {
   return {
    ...session,
    context: {
      payload: sendDisagreementPayloadName,
      step: step
    }
  };
}

module.exports = {
  'SEND_DISAGREEMENT_PAYLOAD_HANDLER': sendDisagreementPayloadHandler,
  'SEND_DISAGREEMENT_PAYLOAD_NAME' : sendDisagreementPayloadName
}