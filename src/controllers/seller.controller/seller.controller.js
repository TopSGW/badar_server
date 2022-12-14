import bcrypt from 'bcryptjs';
import {
  body
} from 'express-validator/check';
import User from '../../models/user.model/user.model';
import ApiError from '../../helpers/ApiError';
import i18n from 'i18n'
import Seller from '../../models/seller.model/seller.model';
import {
  checkValidations
} from '../../helpers/CheckMethods';

export default {

  validateSeller() {
    let validations = [
      body('id').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_en').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_ar').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('email').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('address_en').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('address_ar').not().isEmpty().withMessage(() => {
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
      body('documents').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async seller(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.files);

      if (validation.id) {
        let item = await Seller.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_en: validation.name_en,
            name_ar: validation.name_ar,
            email: validation.email,
            phone: validation.phone,
            address_en: validation.address_en,
            address_ar: validation.address_ar,
            description_ar: validation.description_ar,
            description_en: validation.description_en,
            city: validation.city,
            region: validation.region,
            zip: validation.zip,
            documents: validation.documents,
          }
        }, {
          upsert: true
        }, function(err, doc) {
          if (err) return res.send(500, {
            error: err
          });
          console.log(item);
          return res.status(200).send(item);
        });

      } else {
        let newGroupUnit = await Seller.create({
          _id: false,
          name_en: validation.name_en,
          name_ar: validation.name_ar,
          email: validation.email,
          phone: validation.phone,
          address_en: validation.address_en,
          address_ar: validation.address_ar,
          description_ar: validation.description_ar,
          description_en: validation.description_en,
          city: validation.city,
          region: validation.region,
          zip: validation.zip,
          documents: validation.documents,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getSeller(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = {};
      if (!req.query.id) {
        itemGroups = await Seller.find({
          deleted: false
        });
      } else {
        let id = req.query.id;
        itemGroups = await Seller.findOne({
          _id: id,
          deleted: false
        });
      }


      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async delSeller(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await Seller.updateOne({
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
};
