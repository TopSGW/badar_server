import {
  body
} from 'express-validator/check';
import User from '../../models/user.model/user.model';
import Upload from '../../models/upload.model/upload.model';
import UserGroup from '../../models/user_role.model/user_role.model';
import ApiError from '../../helpers/ApiError';
import i18n from 'i18n';
import ApiResponse from '../../helpers/ApiResponse';
import moment from 'moment';
import { checkValidations } from '../../helpers/CheckMethods';
import { sendsms } from '../../services/sendSms'
import jwt from 'jsonwebtoken';

import fs from 'fs';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import httpRequest from 'https';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'support@kenf.sa',
        pass: 'pleveclhrtilpglw'
    }
})

const readHTMLFile = (path, callback) => {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
            throw err;
        }
        else {
            callback(null, html);
        }
    });
};

const createPromise = query => {
    let newPromise = new Promise(async (resolve, reject) => {
        try {
            const result = await query;
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
    return newPromise;
}

export default {

    // -------------------- Email Verification --------------------

    async EmailVerification(req, res, next) {
        const email = req.body.email;
        const confirmCode = Math.floor(1000 + Math.random() * 9000);

        readHTMLFile(__dirname + '/../index.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = { usercode: confirmCode };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'support@kenf.sa',
                to: email,
                subject: 'Verify Email',
                html: htmlToSend
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return res.status(500).send({
                        status: '500',
                        msg: error
                    });
                } else {
                    return res.status(200).send({
                        status: '200',
                        msg: 'sent code.',
                        code: confirmCode
                    });
                }
            });                              
        });
    },

    // -------------------- Phone Verification --------------------

    async PhoneVerification(req, res, next) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      };

      const confirmCode = Math.floor(1000 + Math.random() * 9000);
      console.log(confirmCode)

      const data = `{
        "userName": "kenf",
        "numbers": ${req.body.phone},
        "userSender": "kenf",
        "apiKey": "42808216411af0ea80dba6e349880a21",
        "msg": ${confirmCode}
      }`;

      const request = httpRequest.request('https://www.msegat.com/gw/sendsms.php', options, response => {
        let responseData = '';

        response.on('data', dataChunk => {
          responseData += dataChunk;
        });
        response.on('end', () => {
          console.log('Response: ', responseData);
        });
      });

      request.on('error', error => console.log('ERROR', error));

      request.write(data);
      request.end();

      res.status(200).json({ code: confirmCode });
  },

  // --------------------------- Register User ---------------------------

  async registerUser(req, res, next) {

      User.find(req.body)
          .then(user => {

              var token = jwt.sign(
                req.body,
                process.env.JWT_SECRET, {
                expiresIn: 86400, // 24 hours
              });

              if (user.length) {
                  res.status(201).json(token);
              } else {
                  let newUser = User.create(req.body);

                  res.status(200).json(token);
              }
          })
          .catch(err => console.log(err));

  },

  // -------------------- Get Profile --------------------

  async getProfile(req, res, next) {
    try {

      const token = req.body.token;
      const query = await jwt.verify(token, process.env.JWT_SECRET);
      const keys = Object.keys(query);

      await User.findOne({ [keys[0]]: query[keys[0]] })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => console.log(err))

    } catch(err) {

    }
  },

  // -------------------- Save Profile --------------------

  async saveProfile(req, res, next) {
    try {
      const token = req.body.token;
      const query = jwt.verify(token, process.env.JWT_SECRET);
      const keys = Object.keys(query);

      User.updateOne(
        { [keys[0]]: query[keys[0]] },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: {
              fullname: req.body.addressName,
              phone: req.body.addressPhone,
              email: req.body.addressEmail,
              country: req.body.addressCountry,
              city: req.body.addressCity,
              zipCode: req.body.addressZipCode,
              street: req.body.addressStreet,
            },
            billingAddress: {
              fullname: req.body.billingAddressName,
              phone: req.body.billingAddressPhone,
              email: req.body.billingAddressEmail,
              country: req.body.billingAddressCountry,
              city: req.body.billingAddressCity,
              zipCode: req.body.billingAddressZipCode,
              street: req.body.billingAddressStreet,
            },
            cardNumber: req.body.cardNumber,
            cardExpire: req.body.cardExpire,
            cardCVV: req.body.cardCVV,
            cardType: req.body.cardType
          }
        }
      )
      .then(user => res.status(200).json(user))
      .catch(err => console.log(err));

    } catch(err) {
      next(err);
    }
  },

  // -------------------- Save Address --------------------

  async saveAddress(req, res, next) {
    try {
      const token = req.body.token;
      const query = jwt.verify(token, process.env.JWT_SECRET);
      const keys = Object.keys(query);

      User.updateOne(
        { [keys[0]]: query[keys[0]] },
        {
          $set: {
            address: {
              fullname: req.body.addressName,
              phone: req.body.addressPhone,
              email: req.body.addressEmail,
              country: req.body.addressCountry,
              city: req.body.addressCity,
              zipCode: req.body.addressZipCode,
              street: req.body.addressStreet,
            },
            billingAddress: {
              fullname: req.body.billingAddressName,
              phone: req.body.billingAddressPhone,
              email: req.body.billingAddressEmail,
              country: req.body.billingAddressCountry,
              city: req.body.billingAddressCity,
              zipCode: req.body.billingAddressZipCode,
              street: req.body.billingAddressStreet,
            }
          }
        }
      )
      .then(user => res.status(200).json(user))
      .catch(err => console.log(err));

    } catch(err) {
      next(err);
    }
  },

  async upload(req, res, next) {
    try {
        if(!req.files) {
            res.send(500, {
              error: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            console.log('IMAGE UPLOAD', req.files);
            let avatar = req.files.avatar;
            const fileFormat = (avatar.name).split('.');
            var hash = crypto.createHash('md5').update(avatar.name +  new Date()).digest('hex');
            const filename =  fileFormat[0] + '-' + hash + '.' + fileFormat[fileFormat.length - 1];
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + filename);

            //send response
            let upload = await Upload.create({
              _id: false,
              link:  '/uploads/' + filename,
              file_type: avatar.mimetype,
              user_id: req.user.id,
            });
            res.status(200).send(upload);
        }
    } catch (err) {
        next(err);
    }
  },
  async getFile(req, res, next) {
    try {
        if(!req.query.id) {
            res.send(500, {
              error: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let id = req.query.id;
            

            //send response
            let upload = await Upload.findOne({
                _id: id,
              });


              res.type(upload.file_type);
              res.sendFile(process.cwd() + upload.link);

        }
    } catch (err) {
        next(err);
    }
  },
  
    validateUserGroup() {
      let validations = [
        body('id').optional().not().isEmpty().withMessage(() => {
          return i18n.__('phoneRequired')
        }),
        body('name_ar').not().isEmpty().withMessage(() => {
          return i18n.__('phoneRequired')
        }),
        body('name_en').not().isEmpty().withMessage(() => {
          return i18n.__('phoneRequired')
        }),
        body('permissions').not().isEmpty().withMessage(() => {
          return i18n.__('phoneRequired')
        }),
      ];
      return validations;
    },
    async userGroup(req, res, next) {
      try {
        const validation = checkValidations(req);

        if (validation.id) {
          let item = await UserGroup.updateOne({
            _id: validation.id
          }, {
            $set: {
              name_ar: validation.name_ar,
              name_en: validation.name_en,
              permissions: validation.permissions,
            }
          }, {
            upsert: true
          }, function(err, doc) {
            if (err) return res.send(500, {
              error: err
            });
            return res.status(200).send(item);
          });

        } else {
          let newGroupUnit = await UserGroup.create({
            _id: false,
            name_ar: validation.name_ar,
            name_en: validation.name_en,
            permissions: validation.permissions,

          });
          res.status(200).send(newGroupUnit);

        }
      } catch (error) {
        next(error);
      }
    },
    async getUserGroup(req, res, next) {
      try {
        let user = req.user;
        let itemGroups = await UserGroup.find({
          deleted: false
        });

        res.status(200).send(itemGroups);

      } catch (error) {
        next(error);
      }
    },

    async delUserGroup(req, res, next) {
      try {
        
        if (req.query.id) {
          await UserGroup.updateOne({
            _id: req.query.id
          }, {
            $set: {
              deleted: true
            }
          }, {
            upsert: true
          }, function(err, doc) {
            if (err) return res.send(500, {
              error: err
            });
            return res.status(200).send({
              success: true
            });
          });
        } else {
          next("delete items group error");
        }
      } catch (error) {
        next(error);
      }
    },
    /***/
    async getUsers(req, res, next) {
        try {
          let user = req.user;
          let itemGroups = await User.find({
            deleted: false
          });
          res.status(200).send(itemGroups);

        } catch (error) {
          next(error);
        }
      },

  validateDeviceId() {
    let validations = [
      body('id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('deviceId').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      })
    ];
    return validations;
  },
  async CheckDeviceId(req, res, next) {
    try {
      const validatedBody = checkValidations(req);
      var query = {
        deleted: false
      }
      query = {
        ...query,
        _id: validatedBody.id
      }
      let user = await User.findOne(query) //.populate(populateQuery);
      if (user) {
        let isDevice = user.deviceId != validatedBody.deviceId
        res.status(200).send({
          isDevice: isDevice
        })
      }
    } catch (err) {
      next(err);
    }
  },
  validateVerifyPhone() {
    return [
      body('code').not().isEmpty().withMessage(() => {
        return i18n.__('codeRequired')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name').not().isEmpty().withMessage(() => {
        return i18n.__('nameRequired')
      })

    ];
  },
  validateUserSignin() {
    let validations = [
      body('email').not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      }),
      body('password').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      })
    ];
    return validations;
  },

  async signIn(req, res, next) {
    try {
      const validatedBody = checkValidations(req);
      var query = {
        deleted: false,
        email: validatedBody.email,
      } //, type: validatedBody.type };

      let user = await User.findOne(query) //.populate(populateQuery);
      if (user) {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return next(new ApiError(403, i18n.__('Invalid Password!')));
        }

        var token = jwt.sign({
          id: user.id
        }, process.env.JWT_SECRET, {
          expiresIn: 86400, // 24 hours
        });


        res.status(200).send({
          id: user._id,
          email: user.email,
          user_role: user.user_role,
          status: user.status,
          password: user.password.lenght>0,
          token: token,
        });

      } else {
        return next(new ApiError(403, i18n.__('userNotFound')));
      }
    } catch (err) {
      next(err);
    }
  },
  validateAdminSignin() {
    let validations = [
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      })
      //            body('password').not().isEmpty().withMessage(() => { return i18n.__('passwordRequired') }),
      // body('type').not().isEmpty().withMessage(() => { return i18n.__('typeIsRequired') })
      // .isIn(['CLIENT','MARKET','TRADER','DRIVER']).withMessage(() => { return i18n.__('userTypeWrong') }),
    ];
    return validations;
  },

  async AdminsignIn(req, res, next) {
    try {
      const validatedBody = checkValidations(req);
      var query = {
        deleted: false,
        type: {
          $in: ["ADMIN"]
        }
      } //, type: validatedBody.type };
      query = {
        ...query,
        ...getCountryCode(validatedBody.phone)
      }
      let user = await User.findOne(query)
      if (user) {
        // res.status(200).send("send code successfuly")
        if (!testNumber.includes(query.phone)) {
          twilioSend(query.countryCode + query.phone, 'ar', res, next);
        } else {
          res.status(200).send("send code successfuly");
        }
      } else {
        return next(new ApiError(403, i18n.__('userNotFound')));
      }
    } catch (err) {
      next(err);
    }
  },




  validateUserCreateBody() {
    let validations = [

      // body('name').not().isEmpty().withMessage(() => { return i18n.__('nameRequired') })
      // .custom(async (value, { req }) => {
      //     value = (value.trim());
      //     let userQuery = { username: value, deleted: false };
      //     if (await User.findOne(userQuery))
      //         throw new Error(i18n.__('usernameDuplicated'));
      //     return true;
      // })

      body('email').trim().not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      })
      .isEmail().withMessage(() => {
        return i18n.__('EmailNotValid')
      })
      .custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        await User.updateMany({
          email: value,
          deleted: false,
          phoneVerified: false
        }, {
          $set: {
            deleted: true
          }
        });
        let userQuery = {
          email: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('emailDuplicated'));
        return true;
      }),
      body('password').not().isEmpty().withMessage(() => {
        return i18n.__('passwordRequired')
      }),
      body('name').optional().not().isEmpty().withMessage(() => {
        return i18n.__('typeRequired')
      }),
      body('type').optional().not().isEmpty().withMessage(() => {
        return i18n.__('typeRequired')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('PhoneIsRequired')
      }).custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        await User.updateMany({
          phone: value,
          deleted: false,
          phoneVerified: false
        }, {
          $set: {
            deleted: true
          }
        });
        let userQuery = {
          phone: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('phoneDuplicated'));
        return true;
      }),

    ];
    return validations;
  },

  async userSignUp(req, res, next) {
    try {
      var randomCode = '' + (Math.floor(100000 + Math.random() * 900000));
      // const validatedBody = checkValidations(req);
      if (req.body.email) {
           req.body.email = (req.body.email.trim()).toLowerCase();
      }

      // if (req.files && req.files['image'] && (req.files['image'].length > 0)) {
      //     validatedBody.image = fieldhandleImg(req, { attributeName: 'image', isUpdate: false })[0];
      // }
      // if (req.files && req.files['commercialRecord'] && (req.files['commercialRecord'].length > 0)) {
      //     validatedBody.commercialRecord = fieldhandleImg(req, { attributeName: 'commercialRecord', isUpdate: false })[0];
      // }
      // if (req.files && req.files['taxCard'] && (req.files['taxCard'].length > 0)) {
      //     validatedBody.taxCard = fieldhandleImg(req, { attributeName: 'taxCard', isUpdate: false })[0];
      // }


      // if ((validatedBody.type ==  'CLIENT') && (!validatedBody.email) ) {
      //     return next(new ApiError(404,i18n.__('emailRequired')) );
      // }
      // if ((validatedBody.type == 'TRADER') && (!(validatedBody.shopType && validatedBody.market  )) ) {
      //     return next(new ApiError(404,i18n.__('shopTypeAndMarketRequired')) );
      // }

      // if(validatedBody.type == 'TRADER'){
      //     let subscription = await Subscription.findOne({deleted: false,type:'FREE'});
      //     if(subscription) validatedBody.subscription = subscription.id;
      // }
      const salt =await bcrypt.genSaltSync();
      var hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;

      let query = {
        ...req.body,
        confirmationCode: randomCode
      };
      let createdUser = await User.create(query);
    //  createdUser = await User.populate(createdUser,populateQuery);
    //  createdUser = User.schema.methods.toJSONLocalizedOnly(createdUser, i18n.getLocale());

      //adminNSP.to('room-admin').emit(socketEvents.NewSignup, { user: createdUser });


      // res.status(200).send("send code successfuly")
        sendsms(query.phone, 'ar', res, next);

      // twilioSend(query.countryCode  + query.phone,'ar',res,next);
      //  res.status(200).send("send code successfuly");
      // twilioSend(query.countryCode  + query.phone,'ar',res,next);


    } catch (err) {
      next(err);
    }
  },
  validateAddUser() {
    let validations = [

      // body('name').not().isEmpty().withMessage(() => { return i18n.__('nameRequired') })
      // .custom(async (value, { req }) => {
      //     value = (value.trim());
      //     let userQuery = { username: value, deleted: false };
      //     if (await User.findOne(userQuery))
      //         throw new Error(i18n.__('usernameDuplicated'));
      //     return true;
      // })

      body('email').trim().not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      })
      .isEmail().withMessage(() => {
        return i18n.__('EmailNotValid')
      })
      .custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        await User.updateMany({
          email: value,
          deleted: false,
          phoneVerified: false
        }, {
          $set: {
            deleted: true
          }
        });
        let userQuery = {
          email: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('emailDuplicated'));
        return true;
      }),

      body('name').not().isEmpty().withMessage(() => {
        return i18n.__('Name Required')
      }),
      body('user_role').not().isEmpty().withMessage(() => {
        return i18n.__('User Role Required')
      }),
      body('landline').withMessage(() => {
        return i18n.__('landline Required')
      }),
      body('photo').withMessage(() => {
        return i18n.__('photo Required')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('PhoneIsRequired')
      }).custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        await User.updateMany({
          phone: value,
          deleted: false,
          phoneVerified: false
        }, {
          $set: {
            deleted: true
          }
        });
        let userQuery = {
          phone: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('phoneDuplicated'));
        return true;
      }),

    ];
    return validations;
  },
  async addUser(req, res, next) {
    try {
      const validatedBody = checkValidations(req);

      if (validatedBody.email) {
           validatedBody.email = (validatedBody.email.trim()).toLowerCase();
      }

      // if (req.files && req.files['image'] && (req.files['image'].length > 0)) {
      //     validatedBody.image = fieldhandleImg(req, { attributeName: 'image', isUpdate: false })[0];
      // }
      // if (req.files && req.files['commercialRecord'] && (req.files['commercialRecord'].length > 0)) {
      //     validatedBody.commercialRecord = fieldhandleImg(req, { attributeName: 'commercialRecord', isUpdate: false })[0];
      // }
      // if (req.files && req.files['taxCard'] && (req.files['taxCard'].length > 0)) {
      //     validatedBody.taxCard = fieldhandleImg(req, { attributeName: 'taxCard', isUpdate: false })[0];
      // }


      // if ((validatedBody.type ==  'CLIENT') && (!validatedBody.email) ) {
      //     return next(new ApiError(404,i18n.__('emailRequired')) );
      // }
      // if ((validatedBody.type == 'TRADER') && (!(validatedBody.shopType && validatedBody.market  )) ) {
      //     return next(new ApiError(404,i18n.__('shopTypeAndMarketRequired')) );
      // }

      // if(validatedBody.type == 'TRADER'){
      //     let subscription = await Subscription.findOne({deleted: false,type:'FREE'});
      //     if(subscription) validatedBody.subscription = subscription.id;
      // }

      const salt = await bcrypt.genSaltSync();
      var hash = await bcrypt.hash(req.body.password, salt);
      validatedBody.password = hash;

      let query = {
        ...validatedBody, type: "ADMIN",
      };
      let createdUser = await User.create(query);
    //  createdUser = await User.populate(createdUser,populateQuery);
    //  createdUser = User.schema.methods.toJSONLocalizedOnly(createdUser, i18n.getLocale());

      //adminNSP.to('room-admin').emit(socketEvents.NewSignup, { user: createdUser });


      res.status(200).send({success: "User added successfuly"})

      // twilioSend(query.countryCode  + query.phone,'ar',res,next);
      //  res.status(200).send("send code successfuly");
      // twilioSend(query.countryCode  + query.phone,'ar',res,next);


    } catch (err) {
      next(err);
    }
  },
  validateVerifySign() {
    return [
      body('code').not().isEmpty().withMessage(() => {
        return i18n.__('codeRequired')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      })

    ];
  },
  async verifySignIn(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      // var phone = validatedBody.phone;
      // phone = phone.trim()
      validatedBody = {
        ...validatedBody,
        ...getCountryCode(validatedBody.phone)
      }
      var temp = await User.findOne({
        phone: validatedBody.phone,
        deleted: false
      });
      let user = await User.findOne({
        phone: validatedBody.phone,
        deleted: false
      }).populate({
        path: "TripId",
        model: temp.isDriver ? "onlineCar" : "onlineMsfr"
      });
      if (!user)
        return next(new ApiError(403, i18n.__('userNotFound')));
      //
      if (!testNumber.includes(validatedBody.phone)) {
        twilioVerify(validatedBody.countryCode + validatedBody.phone, validatedBody.code, user, res, next);
      } else {
        res.status(200).send(user);
      }
    } catch (err) {
      next(err);
    }
  },
  validateVerifyAdminSign() {
    return [
      body('code').not().isEmpty().withMessage(() => {
        return i18n.__('codeRequired')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      })

    ];
  },
  async verifyAdminSignIn(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      // var phone = validatedBody.phone;
      // phone = phone.trim()
      validatedBody = {
        ...validatedBody,
        ...getCountryCode(validatedBody.phone)
      }
      var user = await User.findOne({
        phone: validatedBody.phone,
        deleted: false
      });

      if (!user)
        return next(new ApiError(403, i18n.__('userNotFound')));

      if (!testNumber.includes(validatedBody.phone)) {
        twilioVerify(validatedBody.countryCode + validatedBody.phone, validatedBody.code, user, res, next);
      } else {
        res.status(200).send(user);
      }
      // res.status(200).send(user)

    } catch (err) {
      next(err);
    }
  },

  async getUserInfo(req, res, next) {
    try {
      var temp = await User.findOne({
        _id: req.query.userId || -1,
        deleted: false
      });
      let user = await User.findOne({
        _id: req.query.userId || -1,
        deleted: false
      }).populate({
        path: "TripId",
        model: temp.isDriver ? "onlineCar" : "onlineMsfr"
      });
      if (!user) {
        return next(new ApiError(403, i18n.__('userNotFound')));
      }
      let band = await bandedModel.findOne({
        deviceId: user.deviceId
      })
      user
      res.status(200).send({
        user: user,
        band: band
      });
    } catch (err) {
      next(err);
    }
  },

  async verifyPhone(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      // var phone = validatedBody.phone;
      // phone = phone.trim()
      validatedBody = {
        ...validatedBody,
        ...getCountryCode(validatedBody.phone)
      }
      // var user = await User.findOne({ phone: phone, deleted: false });
      // if (!user)
      //     return next(new ApiError(403, i18n.__('userNotFound')));
      validatedBody.country = validatedBody.countryCode == "+967" ? "YE" : "SA"
      let user = await User.create(validatedBody)
      // res.status(200).send(user)
      if (!testNumber.includes(validatedBody.phone)) {
        twilioVerify(validatedBody.countryCode + validatedBody.phone, validatedBody.code, {}, res, next, {
          Model: User,
          query: validatedBody
        })
      } else {
        res.status(200).send(user);
      }
    } catch (err) {
      next(err);
    }
  },


  validateResendCode() {
    return [
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      })
    ];
  },

  async resendCode(req, res, next) {
    try {
      let validatedBody = checkValidations(req);

      // var phone = validatedBody.phone;
      // phone = phone.trim()

      // var user = await User.findOne({ phone: phone, deleted: false });
      // if (!user)
      //     return next(new ApiError(403, i18n.__('userNotFound')));
      let query = {
        ...validatedBody,
        ...getCountryCode(validatedBody.phone)
      }
      if (!testNumber.includes(query.phone)) {
        twilioSend(query.countryCode + query.phone, 'ar', res, next);
      } else {
        res.status(200).send("send code successfuly");
      }



      // twilioSend(validatedBody.countryCode  + validatedBody.phone, 'ar');
      // res.status(200).send()

    } catch (err) {
      next(err);
    }
  },

  ///////////////////////////////////////////////////////// in update profile
  validateUpdateToken() {
    let validation = [
      body('token').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('user').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      })
    ];
    return validation;
  },
  async updateToken(req, res, next) {
    try {
      let userId = req.user;
      if (userId !== null) {
        let validatedBody = checkValidations(req);
        let data = {};
        let user = await User.findOne({
          deleted: false,
          _id: validatedBody.user
        });
        user.token = validatedBody.token;
        await user.save();
        res.status(200).send();
      } else {
        next('user_error');

      }
    } catch (err) {
      console.log(err)

      next(err);
    }
  },
  async sendActivateCode(req, res, next) {
    try {
      let user = req.user;
      let validatedBody = checkValidations(req);
      var phone = validatedBody.phone;
      phone = phone.trim();

      // twilioSend(config.countryCode  + phone, user.language || 'ar');
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
  async confirmActivateCode(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      var phone = validatedBody.phone;
      phone = phone.trim();
      // twilioVerify( config.countryCode  + phone, validatedBody.code, null, res, next);
    } catch (err) {
      next(err);
    }
  },

  /////////////////////////////////////////////////////////

  validateCheckPhone() {
    return [
      body('phone').trim().not().isEmpty().withMessage(() => {
        return i18n.__('PhoneIsRequired')
      })
    ]
  },
  async checkExistPhone(req, res, next) {
    try {
      let phone = checkValidations(req).phone;
      let exist = await User.findOne({
        phone: phone,
        deleted: false
      });
      return res.status(200).send({
        duplicated: exist ? true : false
      });
    } catch (error) {
      next(error);
    }
  },

  validateCheckEmail() {
    return [
      body('email').trim().not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      })
    ]
  },
  async checkExistEmail(req, res, next) {
    try {
      let email = checkValidations(req).email.toLowerCase();
      let exist = await User.findOne({
        email: email,
        deleted: false
      });
      return res.status(200).send({
        duplicated: exist ? true : false
      });
    } catch (error) {
      next(error);
    }
  },

  validateUserUpdate() {
    let validations = [
      body('categories').optional().isArray().withMessage(() => {
        return i18n.__('categoriesRequired')
      }),
      body('categories.*.en').optional().not().isEmpty().withMessage(() => {
        return i18n.__('categoryRequired')
      }),
      body('categories.*.ar').optional().not().isEmpty().withMessage(() => {
        return i18n.__('categoryRequired')
      }),

      body('traderMarketAddress').optional(),

      body('storeEmployees').optional().isArray().withMessage('must be an array'),

      // body('workTimes').optional(),
      body('workDays').optional().isArray().withMessage(() => {
        return i18n.__('invalidWorkDays')
      }),
      body('workPeriods').optional().isArray().withMessage(() => {
        return i18n.__('invalidWorkPeriods')
      }),
      body('workPeriods.*.from').optional().not().isEmpty().withMessage(() => {
        return i18n.__('fromRequired')
      }),
      body('workPeriods.*.to').optional().not().isEmpty().withMessage(() => {
        return i18n.__('toRequired')
      }),

      body('subCategories').optional().isArray().withMessage(() => {
        return i18n.__('subCategoriesRequired')
      }),
      body('subCategories.*').optional().not().isEmpty().withMessage(() => {
        return i18n.__('subCategoryRequired')
      })
      .custom(async (value) => {
        await checkExist(value, SubCategory, {
          deleted: false
        });
        return true;
      }),
      body('slider').optional().isArray().withMessage(() => {
        return i18n.__('sliderRequired')
      }),
      body('searchKeys').optional().isArray().withMessage(() => {
        return i18n.__('searchKeysRequired')
      }),

      body('phones').optional()
      .isArray().withMessage(() => {
        return i18n.__('invalidPhonesValue')
      }),
      // .not().isEmpty().withMessage(() => { return i18n.__('phonesRequired') })
      body('socialLinks').optional()
      .isArray().withMessage(() => {
        return i18n.__('socialLinksValueError')
      }),
      body('socialLinks.*.key').optional().not().isEmpty().withMessage(() => {
        return i18n.__('socialLinksRequired')
      }),
      body('socialLinks.*.value').optional().not().isEmpty().withMessage(() => {
        return i18n.__('socialLinksRequired')
      }),


      body('location.address').optional().not().isEmpty().withMessage(() => {
        return i18n.__('addressRequired')
      }),
      body('location.longitude').optional().not().isEmpty().withMessage(() => {
        return i18n.__('longitudeRequired')
      }),
      body('location.latitude').optional().not().isEmpty().withMessage(() => {
        return i18n.__('latitudeRequired')
      }),

      body('market').optional().not().isEmpty().withMessage(() => {
        return i18n.__('marketRequired')
      }).custom(async (val, {
        req
      }) => {
        await checkExist(val, User, {
          deleted: false,
          type: 'MARKET'
        });
        return true;
      }),
      body('shopType').optional().not().isEmpty().withMessage(() => {
        return i18n.__('shopTypeRequired')
      })
      .isIn(['RETAIL', 'WHOLESALE', 'ALL']).withMessage(() => {
        return i18n.__('invalidShopType')
      }),

      body('name').optional().not().isEmpty().withMessage(() => {
        return i18n.__('nameRequired')
      }),
      body('email').optional().trim().not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      })
      .isEmail().withMessage(() => {
        return i18n.__('Email Not Valid')
      })
      .custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        await User.updateMany({
          email: value,
          deleted: false,
          phoneVerified: false
        }, {
          $set: {
            deleted: true
          }
        });
        let userQuery = {
          _id: {
            $ne: req.user.id
          },
          email: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('emailDuplicated'));
        else
          return true;
      }),
      body('phone').optional().not().isEmpty().withMessage(() => {
        return i18n.__('PhoneIsRequired')
      })
      .custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        await User.updateMany({
          phone: value,
          deleted: false,
          phoneVerified: false
        }, {
          $set: {
            deleted: true
          }
        });
        let userQuery = {
          _id: {
            $ne: req.user.id
          },
          phone: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('phoneDuplicated'));
        else
          return true;
      }),
      body('language').optional().not().isEmpty().withMessage(() => {
        return i18n.__('languageRequired')
      }).isIn(['ar', 'en']),
      body('notification').optional().not().isEmpty().withMessage(() => {
        return i18n.__('notificationRequired')
      }),
      body('newPassword').optional().not().isEmpty().withMessage(() => {
        return i18n.__('newPasswordRequired')
      }),
      body('currentPassword').optional().not().isEmpty().withMessage(() => {
        return i18n.__('CurrentPasswordRequired')
      }),
      body('countryCode').optional().not().isEmpty().withMessage(() => {
        return i18n.__('countryCodeRequired')
      }),
      body('countryKey').optional().not().isEmpty().withMessage(() => {
        return i18n.__('countryKeyRequired')
      }),
      body('streetNumber').optional().not().isEmpty().withMessage(() => {
        return i18n.__('streetNumberRequired')
      }),
      body('region').optional().not().isEmpty().withMessage(() => {
        return i18n.__('regionRequired')
      }).custom(async (val, {
        req
      }) => {
        await checkExist(val, Region, {
          deleted: false
        });
        return true;
      }),
      body('subscription').optional().not().isEmpty().withMessage(() => {
        return i18n.__('subscriptionRequired')
      }).custom(async (val, {
        req
      }) => {
        await checkExist(val, Subscription, {
          deleted: false
        });
        return true;
      })
    ];

    return validations;
  },
  async updateInfo(req, res, next) {
    try {
      let userId = req.user.id;
      let validatedBody = checkValidations(req);
      let data = {};
      let user = await checkExistThenGet(userId, User, {
        deleted: false
      });


      if (validatedBody.categories) {
        data.categories = validatedBody.categories;
        delete validatedBody.categories;

      }

      if (validatedBody.subCategories) {
        data.subCategories = validatedBody.subCategories;
        delete validatedBody.subCategories;
      }

      if (validatedBody.location && validatedBody.location.address && validatedBody.location.longitude && validatedBody.location.latitude) {
        validatedBody.geoLocation = {
          type: 'Point',
          coordinates: [validatedBody.location.longitude, validatedBody.location.latitude]
        }
        validatedBody.address = validatedBody.location.address
      }
      if (validatedBody.email) {
        validatedBody.email = (validatedBody.email.trim()).toLowerCase();
      }
      if (req.files && req.files['image'] && (req.files['image'].length > 0)) {
        validatedBody.image = fieldhandleImg(req, {
          attributeName: 'image',
          isUpdate: false
        })[0];
      }
      if (req.files && req.files['commercialRecord'] && (req.files['commercialRecord'].length > 0)) {
        validatedBody.commercialRecord = fieldhandleImg(req, {
          attributeName: 'commercialRecord',
          isUpdate: false
        })[0];
      }
      if (req.files && req.files['taxCard'] && (req.files['taxCard'].length > 0)) {
        validatedBody.taxCard = fieldhandleImg(req, {
          attributeName: 'taxCard',
          isUpdate: false
        })[0];
      }

      if ((validatedBody.slider) && req.files && req.files['newSlider'] && (req.files['newSlider'].length > 0)) {
        let newSlider = fieldhandleImg(req, {
          attributeName: 'newSlider',
          isUpdate: false
        });
        validatedBody.slider = validatedBody.slider.concat(newSlider);
      } else if (req.files && req.files['newSlider'] && (req.files['newSlider'].length > 0)) {
        validatedBody.slider = fieldhandleImg(req, {
          attributeName: 'newSlider',
          isUpdate: false
        });
      }

      if (validatedBody.newPassword) {

        if (validatedBody.currentPassword) {
          if (bcrypt.compareSync(validatedBody.currentPassword, user.password)) {
            const salt = await bcrypt.genSaltSync();
            var hash = await bcrypt.hash(validatedBody.newPassword, salt);
            validatedBody.password = hash;
            delete validatedBody.newPassword;
            delete validatedBody.currentPassword;
            user = await User.findOneAndUpdate({
              deleted: false,
              _id: userId
            }, {
              ...validatedBody,
              ...data
            }, {
              new: true
            }).populate(populateQuery);
            res.status(200).send(user);
          } else {
            return next(new ApiError(403, i18n.__('currentPasswordInvalid')))
          }
        } else {
          return res.status(400).send({
            error: [{
              location: 'body',
              param: 'currentPassword',
              msg: i18n.__('CurrentPasswordRequired')
            }]
          });
        }
      } else {
        user = await User.findOneAndUpdate({
          deleted: false,
          _id: userId
        }, {
          ...validatedBody,
          ...data
        }, {
          new: true
        }).populate(populateQuery);
        res.status(200).send(user);
      }

    } catch (error) {
      next(error);
    }
  },

  validateUpdatedPassword() {
    let validation = [
      body('newPassword').not().isEmpty().withMessage(() => {
        return i18n.__('newPasswordRequired')
      }),
      body('currentPassword').not().isEmpty().withMessage(() => {
        return i18n.__('CurrentPasswordRequired')
      }),
    ];
    return validation;
  },
  async updatePasswordFromProfile(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      let user = req.user;
      if (bcrypt.compareSync(validatedBody.currentPassword, user.password)) {
        const salt =await bcrypt.genSaltSync();
        var hash = await bcrypt.hash(validatedBody.newPassword, salt);
        validatedBody.password = hash;
        delete validatedBody.newPassword;
        delete validatedBody.currentPassword;
        user = await User.findOneAndUpdate({
          deleted: false,
          _id: user.id
        }, validatedBody, {
          new: true
        }).populate(populateQuery);
        res.status(200).send({
          user: user
        });
      } else {
        return next(new ApiError(403, i18n.__('currentPasswordInvalid')))
      }
    } catch (error) {
      next(error);
    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////// forget password by email
  validateForgetPassword() {
    return [
      body('email').not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      }),
      body('type').not().isEmpty().withMessage(() => {
        return i18n.__('typeIsRequired')
      })
      .isIn(['ADMIN', 'SUB_ADMIN', 'CLIENT', 'VISITOR', 'MARKET', 'TRADER', 'DRIVER']).withMessage(() => {
        return i18n.__('userTypeWrong')
      }),
    ];
  },
  async forgetPassword(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      var email = validatedBody.email;
      email = (email.trim()).toLowerCase();

      var user = await User.findOne({
        email: email,
        deleted: false,
        type: validatedBody.type
      });
      if (!user)
        return next(new ApiError(403, i18n.__('EmailNotFound')));
      var randomCode = '' + (Math.floor(1000 + Math.random() * 9000));
      var code = new ConfirmationCode({
        email: email,
        code: randomCode
      });
      await code.save();
      var text = 'Enter This Code To Change Your Password ' + randomCode + ' .';
      await sendEmail(email, text);

      res.status(200).send(i18n.__('checkYourMail'));
    } catch (err) {
      next(err);
    }
  },

  validateConfirmCode() {
    return [
      body('email').not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      }),
      body('code').not().isEmpty().withMessage(() => {
        return i18n.__('codeRequired')
      }),
      body('type').not().isEmpty().withMessage(() => {
        return i18n.__('typeIsRequired')
      })
      .isIn(['ADMIN', 'SUB_ADMIN', 'CLIENT', 'VISITOR', 'MARKET', 'TRADER', 'DRIVER']).withMessage(() => {
        return i18n.__('userTypeWrong')
      }),
    ];
  },
  async verifyForgetPasswordCode(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      var email = validatedBody.email;
      var code = validatedBody.code;
      email = (email.trim()).toLowerCase();
      var user = await ConfirmationCode.findOne({
        code,
        email
      });

      if (user) {
        await ConfirmationCode.remove({
          code,
          email
        });
        res.status(200).send(i18n.__('CodeSuccess'));
      } else
        res.status(400).send(i18n.__('CodeFail'));
    } catch (err) {
      next(err);
    }
  },

  async updatePassword(req, res, next) {
    try {
      let validatedBody = checkValidations(req)
      validatedBody.email = (validatedBody.email.trim()).toLowerCase();
      const salt = await bcrypt.genSaltSync();
      var hash = await bcrypt.hash(validatedBody.newPassword, salt);
      var password = hash;
      var user = await User.findOneAndUpdate({
        email: validatedBody.email,
        deleted: false,
        type: validatedBody.type
      }, {
        password: password
      }, {
        new: true
      }).populate(populateQuery);
      if (user) {
        res.status(200).send({
          user,
          token: generateToken(user.id)
        });
      } else
        res.status(404).send(i18n.__('EmailNotFound'));
    } catch (err) {
      next(err);
    }
  },
  ////////////////////////////////////////////////////////////////////////// forget password by phone
  validateForgetPasswordByPhone() {
    return [
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
  },
  async forgetPasswordByPhone(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      var phone = validatedBody.phone;
      phone = phone.trim()
      var user = await User.findOne({
        phone: phone,
        deleted: false
      });
      if (!user)
        return next(new ApiError(403, i18n.__('userNotFound')));
      // twilioSend(config.countryCode  + phone, user.language || 'ar');
      res.status(200).send(i18n.__('checkYourPhone'));
    } catch (err) {
      next(err);
    }
  },

  validateVerifyForgetPasswordByPhone() {
    return [
      body('code').not().isEmpty().withMessage(() => {
        return i18n.__('codeRequired')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
  },
  async verifyForgetPasswordByPhone(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      var phone = validatedBody.phone;
      phone = phone.trim()
      var user = await User.findOne({
        phone: phone,
        deleted: false
      });
      if (!user)
        return next(new ApiError(403, i18n.__('userNotFound')));
      // twilioVerify( /*user.countryCode*/ config.countryCode  + phone, validatedBody.code, user, res, next);
      // twilioVerify('+' + user.countryCode + phone, validatedBody.code, user, res, next);
    } catch (err) {
      next(err);
    }
  },

  validateUpdatePasswordByPhone() {
    return [
      body('password').not().isEmpty().withMessage(() => {
        return i18n.__('passwordRequired ')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
  },
  async updatePasswordByPhone(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      validatedBody.phone = validatedBody.phone.trim();
      let user = await User.findOne({
        deleted: false,
        phone: validatedBody.phone
      });
      if (!user) {
        return next(new ApiError(403, i18n.__('userNotFound')));
      }
      user.password = validatedBody.password;
      await user.save();
      res.status(200).send({
        user,
        token: generateToken(user.id)
      });
    } catch (err) {
      next(err);
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////// reset password

  validateResetPassword() {
    return [
      body('email').not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      }),
      body('newPassword').not().isEmpty().withMessage(() => {
        return i18n.__('newPasswordRequired')
      }),
      body('type').not().isEmpty().withMessage(() => {
        return i18n.__('typeIsRequired')
      })
      .isIn(['ADMIN', 'SUB_ADMIN', 'CLIENT', 'VISITOR', 'MARKET', 'TRADER']).withMessage(() => {
        return i18n.__('userTypeWrong')
      }),
    ];
  },

  async resetPassword(req, res, next) {
    try {

      let validatedBody = checkValidations(req);
      let user = await checkUserExistByEmail(validatedBody.email);

      user.password = validatedBody.newPassword;

      await user.save();

      await reportController.create({
        "ar": 'تغير الرقم السري لمستخدم ',
        "en": "Change Password"
      }, 'UPDATE', req.user.id);

      res.status(200).send();

    } catch (err) {
      next(err);
    }
  },

  //////////////////////////////////////////////////////////////////////////////////////////
  validateAddToken() {
    let validations = [
      body('token').not().isEmpty().withMessage(() => {
        return i18n.__('token is required')
      }),
      body('type').not().isEmpty().withMessage(() => {
        return i18n.__('type is required')
      })
      .isIn(['ios', 'android', 'web']).withMessage(() => {
        return i18n.__('wrong type')
      })
    ];
    return validations;
  },
  async addToken(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      let user = await checkExistThenGet(req.user.id, User, {
        deleted: false
      });
      let tokens = user.tokens;
      let found = false;
      for (let index = 0; index < tokens.length; index++) {
        if (tokens[index].token == validatedBody.token) {
          found = true
        }
      }
      if (!found) {
        user.tokens.push(validatedBody);
        var q = {
          token: validatedBody.token,
          deleted: false
        }
        var doc = await Hash.findOne(q);
        if (doc) {
          if (req.user.id != doc.user) {
            var newdoc = await Hash.findOneAndUpdate(q, {
              user: req.user.id
            });
            var newUser = await User.findByIdAndUpdate(doc.user, {
              $pull: {
                tokens: {
                  token: validatedBody.token
                }
              }
            }, {
              new: true
            });
          }
        } else {
          await Hash.create({
            token: validatedBody.token,
            user: req.user.id
          });
        }
        await user.save();
      }
      res.status(200).send({
        user
      });
    } catch (err) {
      next(err);
    }
  },

  validateLogout() {
    return [
      body('token').not().isEmpty().withMessage('tokenRequired')
    ];
  },
  async logout(req, res, next) {
    try {
      let token = req.body.token;
      let user = await checkExistThenGet(req.user._id, User, {
        deleted: false
      });

      let tokens = [];
      for (let i = 0; i < user.tokens.length; i++) {
        if (user.tokens[i].token != token) {
          tokens.push(user.tokens[i]);
        }
      }
      user.tokens = tokens;

      await user.save();
      res.status(200).send(await checkExistThenGet(req.user._id, User, {
        deleted: false
      }));
    } catch (err) {
      next(err)
    }
  },

  async userInformation(req, res, next) {
    try {
      let {
        userId,
        currentUser
      } = req.query;
      let user = await checkExistThenGet(userId, User, {
        deleted: false,
        populate: populateQuery
      });
      let rate;
      if (currentUser) {
        await checkFollow([user], currentUser);
        await checkinFavorites([user], currentUser);
        rate = await Rate.findOne({
          deleted: false,
          trader: userId,
          user: currentUser
        });
      }
      user = User.schema.methods.toJSONLocalizedOnly(user, i18n.getLocale());
      res.status(200).send({
        user: user,
        rate: rate
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteAccount(req, res, next) {
    try {
      var user = await checkExistThenGet(req.user.id, User, {
        deleted: false
      });
      user.deleted = true;
      await user.save();
      await ConfirmationCode.deleteMany({
        email: user.email
      });
      res.status(200).send('Deleted Successfully');
    } catch (error) {
      next(error);
    }
  },

  async openActiveChatHead(req, res, next) {
    try {
      let user = req.user;
      let newUser = await User.findByIdAndUpdate(user.id, {
        activeChatHead: true
      }, {
        new: true
      });
      res.status(200).send({
        user: newUser
      });
    } catch (error) {
      next(error);
    }
  },

  async closeActiveChatHead(req, res, next) {
    try {
      let user = req.user;
      let newUser = await User.findByIdAndUpdate(user.id, {
        activeChatHead: false
      }, {
        new: true
      });
      res.status(200).send({
        user: newUser
      });

    } catch (error) {
      next(error);
    }
  },

  validateDeleteUserAccount() {
    let validations = [
      body('userId').not().isEmpty().withMessage(() => {
        return i18n.__('userIdRequired')
      }),
    ];
    return validations;
  },
  async deleteUserAccount(req, res, next) {
    try {
      let userId = checkValidations(req).userId;
      var user = await checkExistThenGet(userId, User, {
        deleted: false
      });
      await ConfirmationCode.deleteMany({
        email: user.email
      });
      user.deleted = true;
      await user.save();
      res.status(200).send('Deleted Successfully');
    } catch (error) {
      next(error);
    }
  },

  validateSocialMediaLogin() {
    let validations = [
      body('email').optional().not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      }),
      body('phone').optional().not().isEmpty().withMessage(() => {
        return i18n.__('PhoneIsRequired')
      }),
      body('name').not().isEmpty().withMessage(() => {
        return i18n.__('nameRequired')
      }),
      body('image').optional().not().isEmpty().withMessage(() => {
        return i18n.__('imageRequired')
      }),
      body('socialId').not().isEmpty().withMessage(() => {
        return i18n.__('socialIdRequired')
      }),
      body('socialMediaType').not().isEmpty().withMessage(() => {
        return i18n.__('socialMediaTypeRequired')
      }).isIn(['FACEBOOK', 'TWITTER', 'INSTAGRAM', 'GOOGLE', 'APPLE']).withMessage(() => {
        return i18n.__('socialMediaTypeWrong')
      })
    ];
    return validations;
  },
  async socialMedialLogin(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      let query = {
        deleted: false,
        type: 'CLIENT',
        socialId: validatedBody.socialId
      };

      // if (validatedBody.email) {
      //     validatedBody.email = (validatedBody.email.trim()).toLowerCase();
      //     query.email = validatedBody.email;
      // }
      let user = await User.findOne(query);
      if (user) {
        res.status(200).send({
          user,
          token: generateToken(user.id)
        });
      } else {
        let createdUser = await User.create(validatedBody);
        res.status(200).send({
          user: createdUser,
          token: generateToken(createdUser.id)
        });
      }
    } catch (err) {
      next(err);
    }
  },

  validateVisitorSignUp() {
    let validations = [
      body('token').optional().not().isEmpty().withMessage(() => {
        return i18n.__('token is required')
      }),
      body('type').optional().not().isEmpty().withMessage(() => {
        return i18n.__('type is required')
      })
      .isIn(['ios', 'android', 'web']).withMessage(() => {
        return i18n.__('wrong type')
      })
    ];
    return validations;
  },

  async visitorSignUp(req, res, next) {
    try {
      const validatedBody = checkValidations(req);

      let oldUser;
      if (!oldUser) {
        let tokens = [];
        if (validatedBody.token && validatedBody.type) {
          tokens = [{
            token: validatedBody.token,
            type: validatedBody.type
          }];
        }
        oldUser = await User.create({
          tokens: tokens,
          type: 'VISITOR'
        });
      }
      res.status(200).send({
        user: oldUser,
        token: generateToken(oldUser.id)
      })
    } catch (error) {
      next(error);
    }
  },

  validateIncreaseViews() {
    let validations = [
      body('userId').not().isEmpty().withMessage(() => {
        return i18n.__('userIdRequired')
      }).custom(async (value, {
        req
      }) => {
        req.trader = await checkExistThenGet(value, User, {
          deleted: false,
          type: 'TRADER'
        })
      })
    ];
    return validations;
  },
  async increaseViews(req, res, next) {
    try {
      let validatedBody = checkValidations(req);
      let trader = req.trader;
      trader.views = trader.views + 1;
      await trader.save();
      res.status(200).send('Done');
    } catch (error) {
      next(error);
    }
  },

  async traderGetStatistics(req, res, next) {
    try {
      let user = req.user;
      let followers = createPromise(Follow.count({
        deleted: false,
        trader: user.id
      }));
      let numberOfOrders = createPromise(Order.count({
        deleted: false,
        traders: {
          $elemMatch: {
            trader: user.id
          }
        }
      }));
      let waitingOrders = createPromise(Order.count({
        deleted: false,
        traders: {
          $elemMatch: {
            trader: user.id
          }
        },
        'traders.$.status': 'WAITING'
      }));
      let acceptedOrders = createPromise(Order.count({
        deleted: false,
        traders: {
          $elemMatch: {
            trader: user.id
          }
        },
        'traders.$.status': 'ACCEPTED'
      }));
      let rejectedOrders = createPromise(Order.count({
        deleted: false,
        traders: {
          $elemMatch: {
            trader: user.id
          }
        },
        'traders.$.status': 'REJECTED'
      }));

      let counts = [followers, numberOfOrders, waitingOrders, acceptedOrders, rejectedOrders];
      let result = await Promise.all(counts);

      res.status(200).send({
        views: user.views,
        followers: result[0],
        numberOfOrders: result[1],
        waitingOrders: result[2],
        acceptedOrders: result[3],
        rejectedOrders: result[4],
      });
    } catch (error) {
      next(error);
    }
  },
  async uploadImage(req, res, next) {
    try {
      let Image = await handleImg(req, {
        attributeName: 'image',
        isUpdate: false
      });
      res.status(200).send({
        link: Image
      });
    } catch (error) {
      next(error);
    }
  },


  /////////////////////////////////////////////////////////////////////////////////////////
  validateDriverAddTrader() {
    return [
      body('image').not().isEmpty().withMessage(() => {
        return i18n.__('imageRequired')
      }),
      body('name').not().isEmpty().withMessage(() => {
        return i18n.__('nameRequired')
      }),
      body('email').optional().trim().not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      })
      .isEmail().withMessage(() => {
        return i18n.__('EmailNotValid')
      })
      .custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        let userQuery = {
          email: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('emailDuplicated'));
        else
          return true;
      }),
      body('password').not().isEmpty().withMessage(() => {
        return i18n.__('passwordRequired')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('PhoneIsRequired')
      })
      .custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        let userQuery = {
          phone: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('phoneIsDuplicated'));
        else
          return true;
      }),
      body('countryCode').not().isEmpty().withMessage(() => {
        return i18n.__('countryCodeRequired')
      }),
      body('countryKey').not().isEmpty().withMessage(() => {
        return i18n.__('countryKeyRequired')
      }),
      body('shopType').not().isEmpty().withMessage(() => {
        return i18n.__('shopTypeRequired')
      })
      .isIn(['RETAIL', 'WHOLESALE', 'ALL']).withMessage(() => {
        return i18n.__('invalidShopType')
      }),

      body('region').not().isEmpty().withMessage(() => {
        return i18n.__('regionRequired')
      }).custom(async (val, {
        req
      }) => {
        await checkExist(val, Region, {
          deleted: false
        });
        return true;
      }),
      body('market').optional().not().isEmpty().withMessage(() => {
        return i18n.__('marketRequired')
      }).custom(async (val, {
        req
      }) => {
        await checkExist(val, User, {
          deleted: false,
          type: 'MARKET'
        });
        return true;
      }),
      body('storeEmployees').optional().not().isEmpty().withMessage(() => {
        return i18n.__('storeEmployeesRequired')
      }).isArray().withMessage('must be an array'),
      // body('workTimes').optional().not().isEmpty().withMessage(() => { return i18n.__('workTimesRequired') }),
      body('workDays').optional().isArray().withMessage(() => {
        return i18n.__('invalidWorkDays')
      }),
      body('workPeriods').optional().isArray().withMessage(() => {
        return i18n.__('invalidWorkPeriods')
      }),
      body('workPeriods.*.from').optional().not().isEmpty().withMessage(() => {
        return i18n.__('fromRequired')
      }),
      body('workPeriods.*.to').optional().not().isEmpty().withMessage(() => {
        return i18n.__('toRequired')
      }),

      body('subCategories').optional().isArray().withMessage(() => {
        return i18n.__('subCategoriesRequired')
      }),
      body('subCategories.*').optional().not().isEmpty().withMessage(() => {
        return i18n.__('subCategoryRequired')
      })
      .custom(async (value) => {
        await checkExist(value, SubCategory, {
          deleted: false
        });
        return true;
      }),
      body('slider').optional().isArray().withMessage(() => {
        return i18n.__('sliderRequired')
      }),
      body('searchKeys').optional().isArray().withMessage(() => {
        return i18n.__('searchKeysRequired')
      }),
      body('phones').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phonesRequired')
      })
      .isArray().withMessage(() => {
        return i18n.__('invalidPhonesValue')
      }),
      body('socialLinks').optional().not().isEmpty().withMessage(() => {
        return i18n.__('socialLinksRequired')
      })
      .isArray().withMessage(() => {
        return i18n.__('socialLinksValueError')
      }),
      body('socialLinks.*.key').optional().not().isEmpty().withMessage(() => {
        return i18n.__('socialLinksRequired')
      }),
      body('socialLinks.*.value').optional().not().isEmpty().withMessage(() => {
        return i18n.__('socialLinksRequired')
      }),

      body('streetNumber').optional().not().isEmpty().withMessage(() => {
        return i18n.__('streetNumberRequired')
      }),
      body('location.address').optional().not().isEmpty().withMessage(() => {
        return i18n.__('addressRequired')
      }),
      body('location.longitude').optional().not().isEmpty().withMessage(() => {
        return i18n.__('longitudeRequired')
      }),
      body('location.latitude').optional().not().isEmpty().withMessage(() => {
        return i18n.__('latitudeRequired')
      }),


    ]
  },

  async addTrader(req, res, next) {
    try {
      let user = req.user;
      if (user.type != 'DRIVER') {
        return next(new ApiError(401, 'غير مسموح'))
      }
      let validatedBody = checkValidations(req);
      validatedBody.driver = user.id;
      validatedBody.type = 'TRADER';
      if (validatedBody.email) {
        validatedBody.email = (validatedBody.email.trim()).toLowerCase();

      }

      // if (req.files && req.files['image'] && (req.files['image'].length > 0)) {
      //     validatedBody.image = fieldhandleImg(req, { attributeName: 'image', isUpdate: false })[0];
      // }
      // if (req.files && req.files['commercialRecord'] && (req.files['commercialRecord'].length > 0)) {
      //     validatedBody.commercialRecord = fieldhandleImg(req, { attributeName: 'commercialRecord', isUpdate: false })[0];
      // }
      // if (req.files && req.files['taxCard'] && (req.files['taxCard'].length > 0)) {
      //     validatedBody.taxCard = fieldhandleImg(req, { attributeName: 'taxCard', isUpdate: false })[0];
      // }
      let subscription = await Subscription.findOne({
        deleted: false,
        type: 'FREE'
      });
      if (subscription) validatedBody.subscription = subscription.id;
      validatedBody.phoneVerified = true;

      if (validatedBody.location && validatedBody.location.address && validatedBody.location.longitude && validatedBody.location.latitude) {
        validatedBody.geoLocation = {
          type: 'Point',
          coordinates: [validatedBody.location.longitude, validatedBody.location.latitude]
        }
        validatedBody.address = validatedBody.location.address
      }
      let createdUser = await User.create(validatedBody);
      createdUser = await User.schema.methods.toJSONLocalizedOnly(createdUser, i18n.getLocale());
      res.status(200).send({
        user: createdUser
      });
    } catch (error) {
      next(error)
    }
  },

  validateDriverAddMarket() {
    return [
      body('categories').optional().isArray().withMessage(() => {
        return i18n.__('categoriesRequired')
      }),
      body('categories.*.en').optional().not().isEmpty().withMessage(() => {
        return i18n.__('categoryRequired')
      }),
      body('categories.*.ar').optional().not().isEmpty().withMessage(() => {
        return i18n.__('categoryRequired')
      }),

      body('name').optional().not().isEmpty().withMessage(() => {
        return i18n.__('nameRequired')
      }),
      body('username.ar').optional().not().isEmpty().withMessage(() => {
        return i18n.__('nameRequired')
      }),
      body('username.en').optional().not().isEmpty().withMessage(() => {
        return i18n.__('nameRequired')
      }),
      body('email').optional().trim().not().isEmpty().withMessage(() => {
        return i18n.__('emailRequired')
      })
      .isEmail().withMessage(() => {
        return i18n.__('EmailNotValid')
      })
      .custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        let userQuery = {
          email: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('emailDuplicated'));
        else
          return true;
      }),
      body('password').not().isEmpty().withMessage(() => {
        return i18n.__('passwordRequired')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('PhoneIsRequired')
      })
      .custom(async (value, {
        req
      }) => {
        value = (value.trim()).toLowerCase();
        let userQuery = {
          phone: value,
          deleted: false
        };
        if (await User.findOne(userQuery))
          throw new Error(i18n.__('phoneIsDuplicated'));
        else
          return true;
      }),
      body('countryCode').not().isEmpty().withMessage(() => {
        return i18n.__('countryCodeRequired')
      }),
      body('countryKey').not().isEmpty().withMessage(() => {
        return i18n.__('countryKeyRequired')
      }),
      body('slider').not().isEmpty().isArray().withMessage(() => {
        return i18n.__('sliderRequired')
      }),
      body('region').not().isEmpty().withMessage(() => {
        return i18n.__('regionRequired')
      }).custom(async (val, {
        req
      }) => {
        await checkExist(val, Region, {
          deleted: false
        });
        return true;
      }),
      body('location.address').optional().not().isEmpty().withMessage(() => {
        return i18n.__('addressRequired')
      }),
      body('location.longitude').optional().not().isEmpty().withMessage(() => {
        return i18n.__('longitudeRequired')
      }),
      body('location.latitude').optional().not().isEmpty().withMessage(() => {
        return i18n.__('latitudeRequired')
      }),
      body('shopType').not().isEmpty().withMessage(() => {
        return i18n.__('shopTypeRequired')
      })
      .isIn(['RETAIL', 'WHOLESALE', 'ALL']).withMessage(() => {
        return i18n.__('invalidShopType')
      }),
      body('image').not().isEmpty().withMessage(() => {
        return i18n.__('imageRequired')
      }),

    ]
  },

  async addMarket(req, res, next) {
    try {
      let user = req.user;
      // if (user.type != 'DRIVER') {
      //     return next(new ApiError(401, 'غير مسموح'))
      // }
      let validatedBody = checkValidations(req);
      validatedBody.driver = user.id;
      validatedBody.type = 'MARKET';
      if (validatedBody.email) {
        validatedBody.email = (validatedBody.email.trim()).toLowerCase();
      }

      if (req.file) {
        let image = handleImg(req, {
          attributeName: 'image',
          isUpdate: false
        });
        validatedBody.image = image;
      }
      validatedBody.phoneVerified = true;
      if (validatedBody.location && validatedBody.location.address && validatedBody.location.longitude && validatedBody.location.latitude) {
        validatedBody.geoLocation = {
          type: 'Point',
          coordinates: [validatedBody.location.longitude, validatedBody.location.latitude]
        }
        validatedBody.address = validatedBody.location.address
      }
      let createdUser = await User.create(validatedBody);
      createdUser = await User.schema.methods.toJSONLocalizedOnly(createdUser, i18n.getLocale());
      res.status(200).send({
        user: createdUser
      });
    } catch (error) {
      next(error)
    }
  },
};
