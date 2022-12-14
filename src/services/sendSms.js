import ApiError from '../helpers/ApiError';
import 'dotenv/config'
const https = require('https');

// remove this after you've confirmed it working
const user = process.env.SMS_GATEWAY_USER;
const password = process.env.SMS_GATEWAY_PASSWORD;
const sender = process.env.SMS_GATEWAY_SENDER;


let sendsms = (number, code, res, next) => {
  console.log("TWL", number);
  try {
    const options = {
      hostname: 'rest.gateway.sa',
      port: 443,
      path: '/api/sendsms?'+
            'api_id='+user+
            '&api_password='+password+
            '&textmessage='+code+
            '&phonenumber='+number+
            '&sms_type=T&encoding=T&sender_id=Gateway.sa',
      method: 'GET',
    };
    console.log(options);
    const req = https.request(options, ress => {
      console.log(`statusCode: ${res.statusCode}`);

      ress.on('data', d => {
        process.stdout.write(d);
        res.status(200).send("send code successfuly")
        console.log('verification Sent');
      });
    });

    req.on('error', error => {
      console.error(error);
      next(new ApiError(400, 'فشل إرسال الكود'))

    });

    req.end();

  } catch (error) {
    next(new ApiError(400, 'فشل إرسال الكود'))
    console.log('error in sending sms ==> ', error)
  }
}

export {
  sendsms
};
