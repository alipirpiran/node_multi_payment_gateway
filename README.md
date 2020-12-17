# node_multi_payment_gateway
simple node js module, support multiple payment gateways. to change your payment gateway you just need to change driver name.

## Install

```
npm i iranmultipay
```

## How to use

```javascript
const PaymentGateway = require('iranmultipay');

const zarin_key = 'ab123ab12-ca46-40b8-aca3-0c1234567890';

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
```


## Supports 
* Zarinpal
* IDPay


