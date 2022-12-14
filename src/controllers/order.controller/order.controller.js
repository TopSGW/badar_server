import { body } from "express-validator/check";
import axios from "axios";
import request from "request";
import User from "../../models/user.model/user.model";
import Order from "../../models/order.model/order.model";
import Product from '../../models/products.model/products.model';
import { checkValidations } from "../../helpers/CheckMethods";

import i18n from "i18n";
import jwt from "jsonwebtoken";

export default {
    // @route   GET order/refreshToken
    // @desc    Get access_token using refresh_token
    // @access  Private
    async getAccessToken(req, res, next) {
        try {
            var data = {
                refresh_token: process.env.REFRESH_TOKEN,
            };

            var config = {
                method: "post",
                url: "https://api.tryoto.com/rest/v2/refreshToken",
                headers: {},
                data: data,
            };

            await axios(config)
                .then((response) => res.status(200).json(response.data))
                .catch((err) => console.log(err));
        } catch (error) {
            next(error);
        }
    },

    // @route   POST order/createPickupLocation
    // @desc    Create pick up location
    // @access  Private
    async createPickupLocation(req, res, next) {
        try {
            var data = `{
              "type": "warehouse",
              "code": "W-KENF-01",
              "name": "warehouse",
              "mobile": "0530991700",
              "address": "Al Makarunah Rd, Mishrifah, Jeddah 23336",
              "contactName": "SULIMAN MAHR",
              "contactEmail": "support@kenf.sa",
              "lat": "21.54313889",
              "lon": "39.19616667",
              "city": "Jeddah",
              "postcode": "22230",
              "brandName": "KENF"
          }`;

            var config = {
                method: "post",
                url: "https://api.tryoto.com/rest/v2/createPickupLocation",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.body.token,
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch((err) => console.log(err));
        } catch (error) {
            next(error);
        }
    },

    // @route   POST order/createPickupLocation
    // @desc    Create pick up location
    // @access  Private
    async createOrder(req, res, next) {
        try {
            let date = new Date();
            let orderId = date.getTime();

            var data = {
                orderId: orderId,
                pickupLocationCode: "W-KENF-01",
                serviceType: "pickupFromStore",
                createShipment: true,
                payment_method: "paid",
                amount: req.body.fullTotal,
                amount_due: 0,
                currency: "SAR",
                customer: {
                    name: req.body.address.fullname,
                    email: req.body.address.email,
                    mobile: req.body.address.phone,
                    address: req.body.address.street,
                    city: req.body.address.city,
                    country: req.body.address.country,
                    postcode: req.body.address.zipCode,
                },
                items: req.body.productList.map((item) => {
                    return {
                        productId: item.id,
                        name: item.name_en,
                        price: item.extra_price,
                    };
                }),
            };

            var config = {
                method: "post",
                url: "https://api.tryoto.com/rest/v2/createOrder",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + req.body.token,
                },
                data: data,
            };

            axios(config)
                .then(async (response) => {
                    if (response.data?.success) {
                        const token = req.body.session;
                        const query = jwt.verify(token, process.env.JWT_SECRET);
                        const keys = Object.keys(query);

                        await User.findOne({ [keys[0]]: query[keys[0]] })
                            .then(async user => {
                                await Order.create({
                                    order_id: response.data.otoId,
                                    customer_id: user.id,
                                    products: req.body.cart,
                                    coupon_id: req.body.coupon_id,
                                    price: req.body.totalShoppingBag,
                                    totalPrice: req.body.fullTotal,
                                })
                                .then((order) => res.status(200).json(order))
                                .catch((err) => console.log(err));

                                req.body.productList.map(item => {
                                    Product.updateOne(
                                        { _id: item.id },
                                        {
                                            $set: { quantity: item.quantity - 1 }
                                        }
                                    )
                                    .then(updateProduct => console.log('product', updateProduct));
                                })

                                if (req.body.cartType == "true")
                                    User.updateOne(
                                        { _id: user.id },
                                        {
                                            $set: { cart: [] }
                                        }
                                    )
                                    .then(updateUser => console.log(updateUser))
                                    .catch(err => console.log(err));
                            })
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));
        } catch (error) {
            next(error);
        }
    },

    validateAddorder() {
        let validations = [
            body("customer_id")
                .not()
                .isEmpty()
                .withMessage(() => {
                    return i18n.__("phoneRequired");
                }),
            body("products")
                .not()
                .isEmpty()
                .withMessage(() => {
                    return i18n.__("phoneRequired");
                }),
        ];
        return validations;
    },
    async addorder(req, res, next) {
        try {
            const validatedBody = checkValidations(req);
            let query = {
                ...validatedBody,
                status: "ACCEPTED",
                paymentMethod: "CREDIT",
                paymentStatus: "SUCCESSED",
            };

            let ord = await Order.create(query);
            res.status(200).send(ord);
        } catch (err) {
            console.log(err);
            next(err);
        }
    },
    async getUserorder(req, res, next) {
        try {
            const token = req.body.token;
            const query = jwt.verify(token, process.env.JWT_SECRET);
            const keys = Object.keys(query);

            User.findOne({ [keys[0]]: query[keys[0]] })
                .then((user) => {
                    console.log("searched user", user);

                    Order.find({ customer_id: user.id, deleted: false })
                        .populate("products")
                        .populate("customer_id")
                        .then((orders) => {
                            console.log(orders);
                            res.status(200).json(orders);
                        });
                })
                .catch((err) => console.log(err));
        } catch (err) {
            next(err);
        }
    },
    async getOrders(req, res, next) {
        try {
            const token = req.body.token;
            const query = jwt.verify(token, process.env.JWT_SECRET);
            const keys = Object.keys(query);

            User.findOne({ [keys[0]]: query[keys[0]] })
                .then(async (user) => {
                    Order.find({ customer_id: user.id, deleted: false })
                        .populate("products").populate("customer_id").populate("coupon_id")
                        .then((orders) => {
                            res.status(200).json(orders);
                        });
                })
                .catch((err) => console.log(err));
        } catch (error) {
            next(error);
        }
    },

    async getOrderList(req, res, next) {
        try {
            Order.find({ deleted: false })
                .populate("products")
                .populate("coupon_id")
                .populate("customer_id")
                .then((orders) => res.status(200).json(orders))
                .catch((err) => console.log(err));
        } catch (error) {
            next(error);
        }
    },

    async updateOrders(req, res, next) {
        try {
            let updateOrder = Order.updateOne(
                { order_id: req.body.order_id },
                {
                    $set: {
                        status: req.body.status,
                    },
                },
                {
                    upsert: true,
                }
            )
                .then((shipping) => {
                    res.status(200).json({ success: true });
                })
                .catch((err) => console.log(err));
        } catch (error) {
            next(error);
        }
    },

    async delOrders(req, res, next) {
        try {
            Order.deleteOne({ _id: req.query.id })
                .then((order) => {
                    res.status(200).json(order);
                })
                .catch((err) => console.log(err));
        } catch (error) {
            next(error);
        }
    },

    async initiateSession(req, res, next) {
        try {
            const baseURL = process.env.PAYMENT_URL;

            var configData = {
                CustomerIdentifier: process.env.CUSTOMER_IDENTIFIER,
            };

            var options = {
                method: "POST",
                url: baseURL + "/v2/InitiateSession",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + process.env.LIVE_TOKEN,
                    "Content-Type": "application/json",
                },
                body: configData,
                json: true,
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                res.status(200).json(body);
            });
        } catch (error) {
            next(error);
        }
    },

    async executePayment(req, res, next) {
        const date = new Date();

        const baseURL = process.env.PAYMENT_URL;

        var configData = {
            SessionId: req.body.sessionId,
            CustomerName: req.body.address.fullname,
            CustomerMobile: req.body.address.phone,
            CustomerEmail: req.body.address.email,
            InvoiceValue: req.body.fullTotal,
            Language: "en",
            CustomerAddress: {
                Address: req.body.address.street,
            },
        };

        console.log("---------------- configData ----------------");
        console.log(configData);

        var options = {
            method: "POST",
            url: baseURL + "/v2/ExecutePayment",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + process.env.LIVE_TOKEN,
                "Content-Type": "application/json",
            },
            body: configData,
            json: true,
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log("-------------- execute payment --------------");
            console.log(body);

            getPaymentStatus(body);

            res.status(200).json(body);
        });
    },

    async getInvoice(req, res, next) {
        try {

            const baseURL = process.env.PAYMENT_URL;

            var options = {
                method: 'POST',
                url: baseURL+'/v2/SendPayment',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer '+ process.env.LIVE_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: { 
                    NotificationOption: 'ALL',
                    CustomerName: req.body.customer_id.billingAddress.fullname,
                    DisplayCurrencyIso: 'SAR',
                    MobileCountryCode: '+965',
                    CustomerMobile: req.body.customer_id.billingAddress.phone,
                    CustomerEmail: req.body.customer_id.billingAddress.email,
                    InvoiceValue: req.body.price,
                    Language: 'en',
                    ExpireDate: '',
                    CustomerAddress: {
                        Street: req.body.customer_id.billingAddress.street,
                        Address: req.body.customer_id.billingAddress.city,
                    },
                    InvoiceItems: req.body.products.map(item => ({
                        ItemName: item.name_en,
                        Quantity: 1,
                        UnitPrice: item.extra_price
                    })) 
                },
                json: true 
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                
                res.status(200).json(body)
            });

        } catch(error) {
            next(error);
        }
    }
};

const executePayment = (data) => {
    const date = new Date();

    const baseURL = process.env.PAYMENT_URL;

    var configData = {
        SessionId: data.sessionId,
        CustomerName: data.address.fullname,
        CustomerMobile: data.address.phone,
        CustomerEmail: data.address.email,
        InvoiceValue: data.fullTotal,
        Language: "en",
        CustomerAddress: {
            Address: data.address.street,
        },
    };

    console.log("---------------- configData ----------------");
    console.log(configData);

    var options = {
        method: "POST",
        url: baseURL + "/v2/ExecutePayment",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + process.env.LIVE_TOKEN,
            "Content-Type": "application/json",
        },
        body: configData,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log("-------------- execute payment --------------");
        console.log(body);

        getPaymentStatus(body);
        // directPayment({url: body.Data.PaymentURL, ...data});
    });
};

const directPayment = (data) => {
    var options = {
        method: "POST",
        url: data.url,
        headers: {
            Accept: "application/json",
            Authorization: "bearer " + process.env.LIVE_TOKEN,
            "Content-Type": "application/json",
        },
        body: {
            paymentType: "card",
            card: {
                Number: data.cardNumber,
                expiryMonth: data?.cardExpire.split("/")[0],
                expiryYear: data?.cardExpire.split("/")[1],
                securityCode: data.cardCVV,
            },
        },
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
};

const getPaymentStatus = (data) => {
    console.log(data.Data.InvoiceId);

    const baseURL = process.env.PAYMENT_URL;

    var options = {
        method: "POST",
        url: baseURL + "/v2/GetPaymentStatus",
        headers: {
            Accept: "application/json",
            Authorization: "bearer " + process.env.LIVE_TOKEN,
            "Content-Type": "application/json",
        },
        body: {
            Key: data.Data.InvoiceId,
            KeyType: "invoiceid",
        },
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
};
