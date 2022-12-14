import Customer from '../../models/customer.model/customer.model';
import {
  body
} from "express-validator/check";
import i18n from 'i18n'
import {
  checkValidations
} from '../../helpers/CheckMethods';

export default {

  validate() {
    let validations = [
      body('id').optional().not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('email').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('phone').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('address').not().isEmpty().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async create(req, res, next) {
    try {
      const validation = checkValidations(req);
      console.log(validation);
      console.log(req.body);

      if (validation.id) {
        let item = await Customer.updateOne({
          _id: validation.id
        }, {
          $set: {
            name: validation.name,
            email: validation.email,
            phone: validation.phone,
            address: validation.address,
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
        let newGroupUnit = await Customer.create({
          _id: false,
          name: validation.name,
          email: validation.email,
          phone: validation.phone,
          address: validation.address,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async getCustomers(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = {};
      if (!req.query.id) {
        itemGroups = await Customer.find({
          deleted: false
        }).populate('user_id');
      } else {
        let id = req.query.id;
        itemGroups = await Customer.findOne({
          _id: id,
          deleted: false
        }).populate('user_id');
      }

      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      // console.log(req);
      if (req.query.id) {
        await Customer.updateOne({
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
