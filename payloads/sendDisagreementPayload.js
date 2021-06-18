const { SEND_REQUEST, GET_USER_DATA } = require('../services/callGraphApi');

const sendDisagreementPayloadName = 'SEND_DISAGREEMENT_BUTTON_POSTBACK_PAYLOAD';

const sendDisagreementPayloadHandler = async (sender_psid, session, received_message) => {
  return new Promise(async (resolve, _) => {
    if(!session.context.step) {
      await startedPayload(sender_psid);
      
      const aux_session = generateSesssion(session, 1, {
      });

      resolve(aux_session);
    }
    
    if(session.context.step == 1) {
      requestCityState(sender_psid);
      
      const aux_session = generateSesssion(session, 2, {
        name: received_message.text
      });

      resolve(aux_session);
    }

    if(session.context.step == 2) {
      requestIdRestaurant(sender_psid);

      const aux_session = generateSesssion(session, 3, {
        ...session.context.data,
        state: received_message.text
      });

      resolve(aux_session);
    }

    if(session.context.step == 3) {
      requestEmail(sender_psid);

      const aux_session = generateSesssion(session, 4, {
        ...session.context.data,
        restaurantId: received_message.text
      });

      resolve(aux_session);
    }

    if(session.context.step == 4) {
      requestPhone(sender_psid);

      const aux_session = generateSesssion(session, 5, {
        ...session.context.data,
        email: received_message.text
      });

      resolve(aux_session);
    }

    if(session.context.step == 5) {
      requestMessage(sender_psid);

      const aux_session = generateSesssion(session, 6, {
        ...session.context.data,
        phone: received_message.text
      });

      resolve(aux_session);
    }

    if(session.context.step == 6) {
      await endedPayload(sender_psid);

      const aux_session = generateSesssion(session, 7, {
        ...session.context.data,
        message: received_message.text
      });
      
      // Api request to save data
      console.log(aux_session, '* Request');

      resolve({});
    }
  });
}

const startedPayload = async (sender_psid) => {
  return new Promise(async (resolve, _) => {
    let userData = await GET_USER_DATA(sender_psid);
    userData = JSON.parse(userData);

    await SEND_REQUEST({
      "recipient": { "id": sender_psid },
      "sender_action": "typing_on"  
    }); 
    
    await SEND_REQUEST({
      "recipient": { "id": sender_psid },
      "message": { "text": `${userData.first_name}, gracias por tomarte el tiempo en escribirnos, te ayudaremos a dar el seguimiento pertinente a tu situación.` },
    });

    await SEND_REQUEST({
      "recipient": { "id": sender_psid },
      "sender_action": "typing_on"  
    }); 
    
    await SEND_REQUEST({
      "recipient": { "id": sender_psid },
      "message": { "text": `A continuación, te pediremos algunos datos para poder completar el reporte:` },
    });

    requestName(sender_psid);

    resolve();
  });
}

const endedPayload = async (sender_psid) => {
  return new Promise(async (resolve, _) => {
    await SEND_REQUEST({
      "recipient": { "id": sender_psid },
      "sender_action": "typing_on"  
    }); 
    
    await SEND_REQUEST({
      "recipient": { "id": sender_psid },
      "message": { "text": `Con gusto daremos seguimiento a la situación. ¡Saludos!` },
    });

    resolve();
  });
}

const requestName = async (sender_psid) => {
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `¿Cúal es tu nombre completo?` },
  });
}

const requestCityState = async (sender_psid) => {
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `Escriba el Estado y la Ciudad donde tuvó el problema:` },
  });
}

const requestIdRestaurant = async (sender_psid) => {
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `Id de restaurante. Lo puedes encontrar en tu ticket de compra. Empieza con 110 _ _ _ _`},
  });
}

const requestEmail = async (sender_psid) => {
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `¿Cúal es tu email?`},
  });
}

const requestPhone = async (sender_psid) => {
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `¿Cúal es tu teléfono?`},
  });
}

const requestMessage = async (sender_psid) => {
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "sender_action": "typing_on"  
  }); 
  
  await SEND_REQUEST({
    "recipient": { "id": sender_psid },
    "message": { "text": `Cuéntanos qué pasó`},
  });
}

const generateSesssion = (session, step, data) => {
   return {
    ...session,
    context: {
      payload: sendDisagreementPayloadName,
      step: step,
      data: data
    }
  };
}

module.exports = {
  'SEND_DISAGREEMENT_PAYLOAD_HANDLER': sendDisagreementPayloadHandler,
  'SEND_DISAGREEMENT_PAYLOAD_NAME' : sendDisagreementPayloadName
}