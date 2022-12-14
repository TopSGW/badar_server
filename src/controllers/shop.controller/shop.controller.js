import bcrypt from 'bcryptjs';
import { body } from 'express-validator/check';
import ApiError from '../../helpers/ApiError';
import i18n from 'i18n'
import Shop from '../../models/shop.model/shop.model';
import User from '../../models/user.model/user.model'
import {
  checkValidations
} from '../../helpers/CheckMethods';


export default {
  validateShop() {
    let validations = [
      body('id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('seller_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('app_name_ar').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('app_name_en').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('email').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('phone').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('mobile').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('address_en').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('address_ar').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('description_ar').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('description_en').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('city').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('region').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('zip').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('commission').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('images').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async shop(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log('!!!' + validation);
      console.log(req.files);

      if (validation.id) {
        let item = await Shop.updateOne({
          _id: validation.id
        }, {
          $set: {
            seller_id: validation.seller_id,
            app_name_ar: validation.app_name_ar,
            app_name_en: validation.app_name_en,
            email: validation.email,
            app_abbreviation: req.body.app_abbreviation,
            phone: validation.phone,
            mobile: validation.mobile,
            address_en: validation.address_en,
            address_ar: validation.address_ar,
            description_ar: validation.description_ar,
            description_en: validation.description_en,
            city: validation.city,
            region: validation.region,
            zip: validation.zip,
            commission: validation.commission,
            images: validation.images,
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
        let newGroupUnit = await Shop.create({
          _id: false,
          seller_id: validation.seller_id,
          app_name_ar: validation.app_name_ar,
          app_name_en: validation.app_name_en,
          email: validation.email,
          app_abbreviation: req.body.app_abbreviation,
          phone: validation.phone,
          mobile: validation.mobile,
          address_en: validation.address_en,
          address_ar: validation.address_ar,
          description_ar: validation.description_ar,
          description_en: validation.description_en,
          city: validation.city,
          region: validation.region,
          zip: validation.zip,
          commission: validation.commission,
          images: validation.images,

        });
        console.log(newGroupUnit);
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async delShop(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await Shop.updateOne({
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
  async getShops(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = {};
      if (!req.query.id) {
        itemGroups = await Shop.find({
          deleted: false
        });
      } else {
        let id = req.query.id;
        itemGroups = await Shop.findOne({
          _id: id,
          deleted: false
        });
      }

      console.log('getShop:', itemGroups)

      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },

};
