const zarin_key = '';

const PaymentGateway = require('.');

const payment = new PaymentGateway(zarin_key, 'zarinpal', { sandbox: true });

// Request Payment
payment.request_payment({
  amount: 100000,
  callback: 'callback_url',
  description: 'desciprion',
  order_id: 'order_id', // required for IDPay
});

// Verify Payment (in callback url)
payment.verify_payment({
  payment_id: '1',
  amount: '10000', // required for Zarinpal
  order_id: 'order_id', // required for IDPay
});
async function test() {
  try {
    const result = await payment.request_payment({
      amount: 10000,
      callback: 'https://iprojectyar.ir/test',
      description: 'test',
      order_id: 'test',
    });
    // const result = await drvier.verify_payment({
    //   payment_id: '1',
    //   amount: '10000',
    // });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

main();
