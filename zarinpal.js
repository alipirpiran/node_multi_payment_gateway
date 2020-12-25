const ZarinpalCheckout = require('zarinpal-checkout');
const base_class = require('./base_payment');

class Zarinpal extends base_class {
  constructor(api_key, { sandbox }) {
    super(api_key, { sandbox });
    this.zarinpal = ZarinpalCheckout.create(api_key, sandbox);
  }

  async request_payment({ callback, amount, mail, phone_number, description }) {
    const result = {
      error: null,
      payment_url: null,
      payment_id: null,
    };

    const response = await this.zarinpal.PaymentRequest({
      Amount: amount,
      CallbackURL: callback,
      Description: description,
      Email: mail,
      Mobile: phone_number,
    });
    result.payment_url = response.url + '/ZarinGate';
    result.payment_id = response.authority;
    return result;
  }

  async verify_payment(get_params, { amount }) {
    const result = {
      error: null,
      verified_transaction_id: null,
      complete_response: null,
    };
    if (get_params.Status != 'OK') {
      result.error = true;
      return result;
    }
    const { Authority } = get_params;
    const response = await this.zarinpal.PaymentVerification({
      Amount: amount, // In Tomans
      Authority,
    });
    console.log(response);

    if (response.status == 100) {
      result.verified_transaction_id = response.RefID;
      result.complete_response = response;
    } else {
      result.error = response.status;
    }

    return result;
  }
}

module.exports = Zarinpal;
