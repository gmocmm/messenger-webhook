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
      "text": "Selecciona una opciΓ³n. π€",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "PROMOS β­",
          "payload": GET_PROMOTIONS_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "HORARIOS β",
          "payload": GET_SCHEDULE_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "RESTAURANTES π",
          "payload": GET_RESTAURANTS_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "MENΓ π",
          "payload": GET_MENU_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "PRECIOS π€",
          "payload": GET_PRICES_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "VACANTES πΌ",
          "payload": GET_VACANTS_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "INCONFORMIDAD π",
          "payload": SEND_DISAGREEMENT_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "FACTURAS π",
          "payload": GET_INVOICE_PAYLOAD_NAME,
        },
        {
          "content_type": "text",
          "title": "A DOMICILIO π΅",
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