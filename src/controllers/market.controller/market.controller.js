import MarketingCategory from '../../models/marketing.model/marketing_category.model';
import Offer from '../../models/marketing.model/offer.model';
import Coupon from '../../models/marketing.model/coupon.model';
import axios from 'axios';
import {
  body
} from 'express-validator/check';
import {
  checkValidations
} from '../../helpers/CheckMethods';
import i18n from 'i18n';

export default {

  // --------------------- Confirm Discount ---------------------

  async confirmDiscount(req, res, next) {
    try {

        Coupon.findOne({ code: req.query.code, deleted: false })
          .then(coupon => {
              res.status(200).json(coupon);
          })
          .catch(err => console.log(err));

    } catch (error) {
        next(error);
    }
  },

  validateOffer() {
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
      body('description_ar').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('description_en').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('start_date').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('end_date').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('discount').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async offer(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.body);

      if (validation.id) {
        let item = await Offer.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: validation.name_ar,
            name_en: validation.name_en,
            description_en: validation.description_en,
            description_ar: validation.description_ar,
            start_date: validation.start_date,
            end_date: validation.end_date,
            discount: validation.discount,
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
        let newGroupUnit = await Offer.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
          description_en: validation.description_en,
          description_ar: validation.description_ar,
          start_date: validation.start_date,
          end_date: validation.end_date,
          discount: validation.discount,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getOffer(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await Offer.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async delOffer(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await Offer.updateOne({
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
  /*****/

  validateCategory() {
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
  async category(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.body);

      if (validation.id) {
        let item = await MarketingCategory.updateOne({
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
        let newGroupUnit = await MarketingCategory.create({
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
  async getCategory(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await MarketingCategory.find({
        deleted: false
      });
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async delCategory(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await MarketingCategory.updateOne({
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
  /*****/

  validateCoupon() {
    let validations = [
      body('id').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('code').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('discount').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      // body('start_date').not().isEmpty().withMessage(() => {
      //   return i18n.__('phoneRequired')
      // }),
      // body('end_date').not().isEmpty().withMessage(() => {
      //   return i18n.__('phoneRequired')
      // }),
    ];
    return validations;
  },
  async coupon(req, res, next) {
    try {
      // const validation = checkValidations(req);

      if (req.body.id) {
        let item = await Coupon.updateOne({
          _id: req.body.id
        }, {
          $set: {
            user: req.body.user,
            code: req.body.code,
            discount_type: req.body.discount_type,
            discount: req.body.discount,
            max_discount: req.body.max_discount,
            profit_type: req.body.profit_type,
            profit: req.body.profit,
            total_purchase_condition: req.body.total_purchase_condition,
            included_category: req.body.included_category,
            except_discounted_product: req.body.except_discounted_product,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
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
        let newGroupUnit = await Coupon.create({
          _id: false,
          user: req.body.user,
          code: req.body.code,
          discount_type: req.body.discount_type,
          discount: req.body.discount,
          max_discount: req.body.max_discount,
          profit_type: req.body.profit_type,
          profit: req.body.profit,
          total_purchase_condition: req.body.total_purchase_condition,
          included_category: req.body.included_category,
          except_discounted_product: req.body.except_discounted_product,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getCoupon(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await Coupon.find({
        deleted: false
      }).populate('included_category');
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async delCoupon(req, res, next) {
    try {
      console.log(req.query.id);
      if (req.query.id) {
        await Coupon.updateOne({
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
