import bcrypt from 'bcryptjs';
import { body } from 'express-validator/check';
import User from '../../models/user.model/user.model';
import ApiError from '../../helpers/ApiError';
import i18n from 'i18n'
import Product from '../../models/products.model/products.model';
import {
  checkValidations
} from '../../helpers/CheckMethods';

import fs from "fs";
import path from "path";
import url from "url";

export default {
  async addVisit(req, res, next) {
    Product.updateOne({
      _id: req.body.id
    }, {
      $set: {
        visited: req.body.visit + 1
      }
    })
    .then(product => {
      console.log(product)
      return res.status(200).json(product);
    })
    .catch(err => console.log(err));
  },
  validateProduct() {
    let validations = [
      body('id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('isExclusive').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('seller_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_ar').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('name_en').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('category_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('kenf_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('purity_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('shop_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('weight').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),

      body('quantity').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('description_ar').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('description_en').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('group_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('unit_id').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('commission').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('extra_price').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
      body('images').optional().withMessage(() => {
        return i18n.__('phoneRequired')
      }),
    ];
    return validations;
  },
  async product(req, res, next) {
    try {
      const validation = checkValidations(req);

      if (validation.id) {
        console.log("Input Products: ", req.body)
        let updateProduct = await Product.updateOne({
          _id: validation.id
        }, {
          $set: {
            name_ar: req.body.name_ar,
            name_en: req.body.name_en,
            category_id: req.body.category_id,
            kenf_id: req.body.kenf_id,
            purity_id: req.body.purity_id,
            shop_id: req.body.shop_id,
            extra_price: req.body.extra_price,
            weight: req.body.weight,
            quantity: req.body.quantity,
            description_ar: req.body.description_ar,
            description_en: req.body.description_en,
            group_id: req.body.group_id,
            unit_id: req.body.unit_id,
            ringSize: req.body?.ring_size,
            commission: req.body.commission,
            isExclusive: req.body.isExclusive,
            color: req.body.color,
            images: typeof req.body.images[0] == 'object' ? req.body.images.map(item => item.id) : req.body.images,
          }
        });

        return res.status(200).json({value: updateProduct});

      } else {
        let newGroupUnit = await Product.create({
          _id: false,
          name_ar: validation.name_ar,
          name_en: validation.name_en,
          category_id: validation.category_id,
          kenf_id: validation.kenf_id,
          extra_price: validation.extra_price,
          purity_id: validation.purity_id,
          shop_id: validation.shop_id,
          weight: validation.weight,
          quantity: validation.quantity,
          description_ar: validation.description_ar,
          description_en: validation.description_en,
          group_id: validation.group_id,
          unit_id: validation.unit_id,
          ringSize: req.body?.ring_size,  
          commission: validation.commission,
          isExclusive: validation.isExclusive,
          color: validation.color,
          images: validation.images,
        });
        res.status(200).send(newGroupUnit);

      }
    } catch (error) {
      next(error);
    }
  },
  async delProduct(req, res, next) {
    try {
      if (req.query.id) {
        await Product.updateOne({
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
  async getProduct(req, res, next) {
    try {
      // let user = req.user;
      let itemGroups = {};

      if (!req.query.id) {
        itemGroups = await Product.find({
          deleted: false
        }).populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');
      } else {
        let id = req.query.id;
        itemGroups = await Product.findOne({
          _id: id,
          deleted: false
        }).populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');
      }

      res.status(200).send(itemGroups ? itemGroups : {});

    } catch (error) {
      next(error);
    }
  },
  async hideProduct(req, res, next) {
    try {
        let item = await Product.updateOne({
          _id: req.body.id
        }, {
          $set: {
            hidden: !req.body.hide,
          }
        }, {
          upsert: true
        }, function(err, doc) {
          if (err) return res.send(500, {
            error: err
          });
          return res.status(200).send(doc);
        });
    } catch (error) {
      next(error);
    }
  },
  async filtredProducts(req, res, next) {
    try {
      let user = req.user;
      let itemGroups = await Product.find({
        deleted: false
      }).where('group_id').in(req.body.groups).where('category_id').in(req.body.categories).where('shop_id').in(req.body.shops).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');
      res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
  async generateBarcodeProducts(req, res, next) {
    console.log('generatebarcode', req.body)
    try {
      let user = req.user;
      let id = req.body.id;
      let barcode = req.body.barcode;
      let doc = await Product.findOneAndUpdate({
        _id: id
      }, {
        barcode: barcode,
      }, {
        new: true
      });

      console.log('generateserver',doc.barcode)
      res.status(200).json({barcode: doc.barcode});

    } catch (error) {
      next(error);
    }
  },
  async getBarcodeProducts(req, res, next) {
    try {
      let user = req.user;
      let barcode = req.query.barcode;
      console.log('getbarcode', barcode)
      var JsBarcode = require('jsbarcode');
      var {
        createCanvas
      } = require("canvas");
      var canvas = createCanvas();
      JsBarcode(canvas, barcode);


      //ending the response by sending the image buffer to the browser
      res.status(200).send(JSON.stringify(canvas.toDataURL("image/png")));

      //ending the response by sending the image buffer to the browser

    } catch (error) {
      next(error);
    }
  },
  async scanBarcodeProducts(req, res, next) {
    try {
      let barcode = req.query.barcode;
      let itemGroups = await Product.findOne({
        barcode: barcode,
        deleted: false
      }).populate('unit_id').populate('unit_id').populate('images').populate('group_id').populate('shop_id').populate('purity_id').populate('category_id');

        res.status(200).send(itemGroups);

    } catch (error) {
      next(error);
    }
  },
};
