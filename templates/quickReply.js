const { GET_PROMOTIONS_PAYLOAD_NAME } = require('./../payloads/getPromotionsPayload');
const { GET_SCHEDULE_PAYLOAD_NAME } = require('./../payloads/getSchedulePayload');
const { GET_RESTAURANTS_PAYLOAD_NAME } = require('./../payloads/getRestaurantsPayload');
const { GET_MENU_PAYLOAD_NAME } = require('./../payloads/getMenuPayload');
const { GET_PRICES_PAYLOAD_NAME } = require('./../payloads/getPricesPayload');
const { GET_VACANTS_PAYLOAD_NAME } = require('./../payloads/getVacantsPayload');
const { SEND_DISAGREEMENT_PAYLOAD_NAME } = require('./../payloads/sendDisagreementPayload');
const { GET_INVOICE_PAYLOAD_NAME } = require('./../payloads/getInvoicePayload');
const { ORDER_PRODUCT_PAYLOAD_NAME } = require('./../payloads/orderProductPayload');

const mainMenu = (sender_psid) => {
  const request_body = {
    "recipient": { "id": sender_psid },
    "messaging_type": "RESPONSE",
    "message": {
      "text": "Selecciona una opción. 🤓",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "PROMOS ⭐",
          "payload": GET_PROMOTIONS_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "HORARIOS ⌚",
          "payload": GET_SCHEDULE_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "RESTAURANTES 📍",
          "payload": GET_RESTAURANTS_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "MENÚ 🍔",
          "payload": GET_MENU_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "PRECIOS 🤑",
          "payload": GET_PRICES_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "VACANTES 💼",
          "payload": GET_VACANTS_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "INCONFORMIDAD 💔",
          "payload": SEND_DISAGREEMENT_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "FACTURAS 📄",
          "payload": GET_INVOICE_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "A DOMICILIO 🛵",
          "payload": ORDER_PRODUCT_PAYLOAD_NAME,
        }
      ]
    }
  }

  return request_body;
}

module.exports = {
  'MAIN_MENU': mainMenu
}