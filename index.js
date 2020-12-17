// const ZarinPal = require('zarinpal-checkout');
const Zarinpal = require('./zarinpal');
const IDPay = require('./idpay');

class PaymnetDriver {
  /**
   * @param  {} api_key
   * @param  {('idpay' | 'zarinpal')} payment_service
   * @param  {{sandbox}} {}
   */
  constructor(api_key, payment_service, { sandbox = false }) {
    const availible_payment_services = { idpay: 'idpay', zarinpal: 'zarinpal' };

    this.driver = IDPay.prototype;

    if (
      !Object.values(availible_payment_services).find(
        (val) => val == payment_service
      )
    ) {
      throw (
        'payment_service is required, availible values: ' +
        Object.keys(availible_payment_services).join(' | ')
      );
    }

    switch (payment_service) {
      case availible_payment_services.idpay:
        this.driver = new IDPay(api_key, { sandbox });
        break;

      case availible_payment_services.zarinpal:
        this.driver = new Zarinpal(api_key, { sandbox });
        break;
      default:
        break;
    }
  }

  async request_payment({
    callback,
    amount,
    mail,
    phone_number,
    description,
    name,
    order_id,
  }) {
    return this.driver.request_payment({
      callback,
      amount,
      mail,
      phone_number,
      description,
      name,
      order_id,
    });
  }

  /**
   * @param  {Object} param
   * @param param.payment_id
   * @param param.amount - Zarinpal only
   * @param param.order_id - IDPay only
   */
  async verify_payment({ payment_id, order_id, amount }) {
    return this.driver.verify_payment({ payment_id, order_id, amount });
  }
}

module.exports = PaymnetDriver;
