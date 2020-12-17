class BasePaymentModel {
  constructor(api_key, { sandbox = false }) {
    this.api_key = api_key;
    this.sandbox = sandbox ? 1 : 0;
  }

  async verify_payment() {
    return {
      error: null,
      data: null,
    };
  }

  async request_payment() {
    return {
      error: null,
      payment_id: null,
      payment_url: null,
    };
  }
}

module.exports = BasePaymentModel;
