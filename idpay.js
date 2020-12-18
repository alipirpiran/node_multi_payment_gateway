const request = require('request');
const axios = require('axios').default;
const base_class = require('./base_payment');

class IDPay extends base_class {
  constructor(api_key, { sandbox }) {
    super(api_key, { sandbox });
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
    const result = {
      error: null,
      payment_url: null,
      payment_id: null,
    };
    const response = await axios.post(
      'https://api.idpay.ir/v1.1/payment',
      {
        order_id,
        amount,
        name,
        phone: phone_number,
        mail: mail,
        desc: description,
        callback,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.api_key,
          'X-SANDBOX': this.sandbox,
        },
        validateStatus: false,
      }
    );
    if (response.status == 201) {
      result.payment_url = response.data.link;
      result.payment_id = response.data.id;
    } else {
      result.error = response.data;
    }
    return result;
  }

  async verify_payment(get_params, { payment_id, order_id }) {
    const result = {
      error: null,
      complete_response: null,
      verified_transaction_id: null,
    };

    if (get_params.status != 10) {
      result.error = true;
      return result;
    }

    const response = await axios.post(
      'https://api.idpay.ir/v1.1/payment/verify',
      {
        id: payment_id,
        order_id,
      },
      {
        validateStatus: false,
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.api_key,
          'X-SANDBOX': this.sandbox,
        },
      }
    );

    if (response.status == 200) {
      result.verified_transaction_id = response.data.track_id;
      result.complete_response = response.data;
    } else {
      result.error = response.data;
    }

    return result;
  }
}

module.exports = IDPay;
