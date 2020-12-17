const Drvier = require('.');
const zarin_key = '44e3315e-ca46-40b8-aca3-0c23d1154975';
const drvier = new Drvier(zarin_key, 'zarinpal', { sandbox: true });

async function main() {
  try {
    const result = await drvier.request_payment({
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
