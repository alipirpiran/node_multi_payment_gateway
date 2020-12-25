# node_multi_payment_gateway
simple node js module, support multiple payment gateways. to change your payment gateway you just need to change driver name.

## Install

```
npm i iranmultipay
```

## How to use

``` javascript
const PaymentGateway = require('iranmultipay');
const zarin_key = 'ab123ab12-ca46-40b8-aca3-0c1234567890';
const payment = new PaymentGateway(zarin_key, 'zarinpal', { sandbox: true });
```

#### Request Payment

```javascript
// Request Payment
payment.request_payment({
  amount: 100000,
  callback: 'callback_url',
  description: 'desciprion',
  order_id: 'order_id', // required for IDPay
});
/*
returns:
  {
      error,
      payment_url,
      payment_id,
  }
*/

```

#### Verify Payment

```javascript
// Verify Payment (in callback route)
payment.verify_payment(get_params, {
  amount: '10000', // required for Zarinpal
});
/*
returns:
  {
      error,
      verified_transaction_id,
      complete_response,
  }
*/


```

### Available methods
* request_payment
* verify_payment


## Supports 
* Zarinpal
* IDPay


