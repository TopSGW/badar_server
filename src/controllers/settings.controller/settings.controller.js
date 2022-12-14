import User from '../../models/user.model/user.model';
import SystemInfo from '../../models/system_info.model/system_info.model';
import ItemGroup from '../../models/settings.model/items_group.model';
import ItemCategory from '../../models/settings.model/items_category.model';
import ItemSize from '../../models/settings.model/items_size.model';
import Shipping from '../../models/settings.model/shipping.model';
import Units from '../../models/settings.model/units.model';
import Purity from '../../models/settings.model/purity.model';
import Complaints from '../../models/settings.model/complaints.model';
import PM from '../../models/settings.model/payment_method.model';
import OrderStatus from '../../models/settings.model/order_status.model';
import crypto from 'crypto';
import Upload from '../../models/upload.model/upload.model';
import jwt from 'jsonwebtoken';

import ApiResponse from "../../helpers/ApiResponse";
import {
  checkExistThenGet
} from "../../helpers/CheckMethods";
import {
  body
} from 'express-validator/check';
import {
  checkValidations
} from '../../helpers/CheckMethods';
import i18n from 'i18n';
// import config from '../../config'

import fs from 'fs';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';


const populateQuery = [{
  path: 'user',
  model: 'user'
}];

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'leon.devis2002@gmail.com',
        pass: 'mrrrnkqwgcgfrxan'
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

export default {

  // ------------------------- GET SHIPPING --------------------------

  async getShipping(req, res, next) {

    Shipping.find({ deleted: false })
      .then(shipping => {
        res.status(200).json(shipping);
      })
      .catch(err => console.log(err));

  },

  // ------------------------- SET SHIPPING --------------------------

  async setShipping(req, res, next) {

    if (req.body.id) {

      Shipping.updateOne({
        _id: req.body.id
      }, {
        $set: {
          company: req.body.company,
          price: req.body.price,
          time: req.body.time,
        }
      }, {
        upsert: true
      })
      .then(shipping => {
          res.status(200).json({ success: true })
      })
      .catch(err => console.log(err))

    } else {

      const newShipping = {
        _id: false,
        company: req.body.company,
        price: req.body.price,
        time: req.body.time,
      };

      Shipping.create(newShipping)
        .then(shipping => {

          res.status(200).json(shipping)
        })
        .catch(err => console.log(err));
    }

  },

  // ------------------------- DELETE Shipping --------------------------

  async delShipping(req, res, next) {
    Shipping.updateOne({
      _id: req.query.id
    }, {
      $set: {
        deleted: true
      }
    }, {
      upsert: true
    })
    .then(shipping => {
      if (shipping.nModified)
        res.status(200).json({ success: true })
      else
        res.status(201).json({ failure: true })
    })
    .catch(err => console.log(err))
  },

  // ------------------------- Get Favorite --------------------------

  async getFavorite(req, res, next) {
      const token = req.query.token;
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const keys = Object.keys(user);

      let favorite = await User.findOne({ [keys[0]]: user[keys[0]], deleted: false }).populate('favorite').populate('cart').populate('images');

      res.status(200).json(favorite);
  },

  // ------------------------- Set Favorite --------------------------

  async setFavorite(req, res, next) {
      const user = req.body.user;
      const product = req.body.product;

      const query = jwt.verify(user, process.env.JWT_SECRET);
      const keys = Object.keys(query);

      User.findOne({ [keys[0]]: query[keys[0]], deleted: false })
          .then(users => {
              var array = users.favorite.includes(product) ? users.favorite : [...users.favorite, parseInt(product)];

              User.updateOne({
                _id: users._id
              }, {
                $set: {
                  favorite: array,
                }
              }, {
                upsert: true
              })
              .then(update => {
                  res.status(200).json(array);
              })
              .catch(err => console.log(err));

          })
          .catch(err => console.log(err));
  },

  // ---------------------- Delete Favorite -----------------------

  async delFavorite(req, res, next) {
      try {

          const user = req.body.token;
          const product = req.body.product;

          const query = jwt.verify(user, process.env.JWT_SECRET);
          const keys = Object.keys(query);

          User.updateOne({
            [keys[0]]: query[keys[0]]
          }, {
            $set: {
              favorite: product,
            }
          }, {
            upsert: true
          })
          .then(update => {
              res.status(200).json(update);
          })
          .catch(err => console.log(err));


      } catch (error) {
          next(error);
      }
  },

  // ---------------------- Get Cart -----------------------

  async getCart(req, res, next) {
      try {

      } catch (error) {
        next(error);
      }
  },

  // ---------------------- Set Cart -----------------------

  async setCart(req, res, next) {
      try {

          const user = req.body.token;
          const product = req.body.product;

          const query = jwt.verify(user, process.env.JWT_SECRET);
          const keys = Object.keys(query);

          User.updateOne({
            [keys[0]]: query[keys[0]]
          }, {
            $set: {
              cart: product,
            }
          }, {
            upsert: true
          })
          .then(update => {
              res.status(200).json(product);
          })
          .catch(err => console.log(err));

      } catch (error) {
        next(error);
      }
  },

  // ---------------------- Delete Cart -----------------------

  async delCart(req, res, next) {
      try {

          const user = req.body.token;
          const product = req.body.product;

          const query = jwt.verify(user, process.env.JWT_SECRET);
          const keys = Object.keys(query);

          User.updateOne({
            [keys[0]]: query[keys[0]]
          }, {
            $set: {
              cart: product,
            }
          }, {
            upsert: true
          })
          .then(update => {
              res.status(200).json(update);
          })
          .catch(err => console.log(err));

      } catch (error) {
        next(error);
      }
  },

  // ----------------------- Encode Cart ------------------------

  async encodeCart(req, res, next) {

      const addedCart = req.body.addedCart;
      const savedCart = req.body.savedCart;

      let concatCart = addedCart;

      if (savedCart != null) {
          const decodeCart = jwt.verify(savedCart, process.env.JWT_SECRET);

          concatCart = concatCart.concat(decodeCart.cart);
      }

      var token = jwt.sign(
          { cart: concatCart },
          process.env.JWT_SECRET, 
          {
              expiresIn: 86400, // 24 hours
          }
      );

      res.status(200).json(token);

  },

  // ---------------------- DecodeCart -----------------------

  async decodeCart(req, res, next) {

      try {

          const token = req.body.token;

          const decodeCart = jwt.verify(token, process.env.JWT_SECRET);

          res.status(200).json(decodeCart.cart);

      } catch (error) {
          next(error);
      }

  },

  async getItemSize(req, res, next) {

    ItemSize.find({ deleted: false })
      .then(sizes => {

        res.status(200).json(sizes);
      })
      .catch(err => console.log(err));
  },

  async itemSize(req, res, next) {

    if (req.body.id) {

      ItemSize.updateOne({
        _id: req.body.id
      }, {
        $set: {
          name_ar: req.body.name_ar,
          name_en: req.body.name_en,
          unit: req.body.unit,
        }
      }, {
        upsert: true
      })
      .then(size => {
        res.status(200).json(size);
      })
      .catch(err => console.log(err));

    } else {
      const newSize = {
        _id: false,
        name_en: req.body.name_en,
        name_ar: req.body.name_ar,
        unit: req.body.unit,
      };

      ItemSize.create(newSize)
        .then(size => {

          res.status(200).json(size)
        })
        .catch(err => console.log(err));
    }

  },

  async delItemSize(req, res, next) {

    ItemSize.updateOne({
      _id: req.query.id
    }, {
      $set: {
        deleted: true
      }
    }, {
      upsert: true
    })
    .then(size => {
      if (size.nModified)
        res.status(200).json({ success: true })
    })
    .catch(err => console.log(err))
  },

  async getComplaints(req, res, next) {

    Complaints.find().populate('images').then(complaints => {
      res.status(200).json(complaints);
    }).catch(err => console.log(err));
  },

  async setComplaints(req, res, next) {
    if (!req.files) {
        res.send({
            status: "failed",
            message: "No file uploaded",
        });
    } else {

        let avatar = req.files.files;
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
        });

        const newComplaints = await Complaints.create({
          _id: false,
          title: req.body.title,
          name: req.body.name,
          email: req.body.email,
          complaints: req.body.complaints,
          images: upload._id
        });

        res.status(200).json({id: upload._id});
    }
  },

  async delComplaints(req, res, next) {
    Complaints.deleteOne({ _id: req.query.id })
      .then(complaints => {

        res.status(200).json({ success: true });
      })
      .catch(err => console.log(err));
  },

  async sendAnswer(req, res, next) {
    const email = req.body.email;
    const answer = req.body.answer;

    readHTMLFile(__dirname + '/../answer.html', function (err, html) {
        var template = handlebars.compile(html);
        var replacements = { usercode: answer };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'leon.devis2002@gmail.com',
            to: email,
            subject: 'Answer of your complaints in kenf',
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.status(201).send({
                    status: '201',
                    msg: error
                });
            } else {
              Complaints.updateOne(
                { _id: req.body.id }, {
                  $set: {
                    answer: req.body.answer,
                  }
                }, {
                  upsert: true
                }).then(complaints => {

                  return res.status(200).send(complaints);
                }).catch(err => console.log(err));
            }
        });                              
    });
  },

  validateSystemInfo() {
    let validations = [
      body('app_name').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('phone').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('city').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('region').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('zip').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('address').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('vat').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('vat_number').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('commission').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('currency').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('logo').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),

    ];
    return validations;
  },
  async updateSystemInfo(req, res, next) {
    try {
      const validation = checkValidations(req);

      let to_return = await SystemInfo.findOneAndUpdate({}, {
        ...validation
      }, {
        new: true
      });

    } catch (err) {
      next(err);
    }
  },
  async getSystemInfo(req, res, next) {
    try {
      let user = req.user;
      let system = await SystemInfo.findOne();
      res.status(200).send(system);

    } catch (error) {
      next(error);
    }
  },
  validateItemGroup() {
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
    ];
    return validations;
  },
  async itemGroup(req, res, next) {
    try {
      const validation = checkValidations(req);

      if (validation.id) {
        let item = await ItemGroup.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: req.body.name_ar,
            name_en: req.body.name_en,
            abbreviation: req.body.abbreviation,
            images: req.body.images
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
        let newGroupUnit = await ItemGroup.create({
          _id: false,
          name_ar: req.body.name_ar,
          name_en: req.body.name_en,
          abbreviation: req.body.abbreviation,
          images: req.body.images
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getItemGroup(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await ItemGroup.find({
        deleted: false
      }).populate('images');
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  validateDelItemGroup() {
    let validations = [
      body('id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async delItemGroup(req, res, next) {
    try {
      if (req.query.id) {
        await ItemGroup.updateOne({
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

  validateItemCategory() {
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
    ];
    return validations;
  },
  async itemCategory(req, res, next) {
    try {
      const validation = checkValidations(req);

      if (validation.id) {
        let item = await ItemCategory.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
            abbreviation: req.body.abbreviation,
            images: req.body.images,
            kenf_collection: req.body.kenf_collection,
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
        let newGroupUnit = await ItemCategory.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
          kenf_collection: req.body.kenf_collection,
          abbreviation: req.body.abbreviation,
          images: req.body.images,
          isKenf: req.body.isKenf,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getItemCategory(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await ItemCategory.find({
        deleted: false
      }).populate('images');;
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  validateDelItemCategory() {
    let validations = [
      body('id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async delItemCategory(req, res, next) {
    try {
      if (req.query.id) {
        await ItemCategory.updateOne({
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

  validatePurity() {
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
    ];
    return validations;
  },
  async purity(req, res, next) {
    try {
      const validation = checkValidations(req);

      if (validation.id) {
        let item = await Purity.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await Purity.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getPurity(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await Purity.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  validateDelPurity() {
    let validations = [
      body('id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async delPurity(req, res, next) {
    try {
      if (req.query.id) {
        await Purity.updateOne({
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

  validateUnits() {
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
    ];
    return validations;
  },
  async units(req, res, next) {
    try {
      const validation = checkValidations(req);

      if (validation.id) {
        let item = await Units.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await Units.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getUnits(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await Units.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  validateDelUnits() {
    let validations = [
      body('id').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async delUnits(req, res, next) {
    try {
      if (req.query.id) {
        await Units.updateOne({
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
  /******/

  validateOrderStatus() {
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
    ];
    return validations;
  },
  async orderStatus(req, res, next) {
    try {
      const validation = checkValidations(req);

      if (validation.id) {
        let item = await OrderStatus.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await OrderStatus.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getOrderStatus(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await OrderStatus.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async delOrderStatus(req, res, next) {
    try {
      if (req.query.id) {
        await OrderStatus.updateOne({
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
  validatePM() {
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
    ];
    return validations;
  },
  async pm(req, res, next) {
    try {
      const validation = checkValidations(req);

      if (validation.id) {
        let item = await PM.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
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
        let newGroupUnit = await PM.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getPM(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await PM.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async delPM(req, res, next) {
    try {
      if (req.query.id) {
        await PM.updateOne({
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
}
