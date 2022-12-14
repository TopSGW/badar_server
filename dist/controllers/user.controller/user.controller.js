"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _check = require("express-validator/check");

var _user = _interopRequireDefault(require("../../models/user.model/user.model"));

var _upload = _interopRequireDefault(require("../../models/upload.model/upload.model"));

var _user_role = _interopRequireDefault(require("../../models/user_role.model/user_role.model"));

var _ApiError = _interopRequireDefault(require("../../helpers/ApiError"));

var _i18n = _interopRequireDefault(require("i18n"));

var _ApiResponse = _interopRequireDefault(require("../../helpers/ApiResponse"));

var _moment = _interopRequireDefault(require("moment"));

var _CheckMethods = require("../../helpers/CheckMethods");

var _sendSms = require("../../services/sendSms");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var crypto = require('crypto'); // const checkUserExistByEmail = async (email) => {
//     let user = await User.findOne({ email, deleted: false });
//     if (!user)
//         throw new ApiError.BadRequest('email Not Found');
//     return user;
// }
// let populateQuery = [
//     // { path:'categories',model:'category'},
//     { path:'subCategories',model:'category',populate:[{path:'parent',model:'category'}]},
//     { path:'driver',model:'user'},
//     { path:'market',model:'user',populate:[
//         { path: 'region', model: 'region', populate: [{ path: 'city', model: 'city', populate: [{ path: 'country', model: 'country' }] }] },
//     ]},
//     { path:'subscription',model:'subscription'},
//     { path: 'rules', model: 'assignRule' },
//     { path: 'region', model: 'region', populate: [{ path: 'city', model: 'city', populate: [{ path: 'country', model: 'country' }] }] },
// ];


var createPromise = function createPromise(query) {
  var newPromise = new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      var result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return query;

            case 3:
              result = _context.sent;
              resolve(result);
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  return newPromise;
}; // let checkFollow = async (list,userId)=>{
//     try {
//         let promises = [];
//         let length = list.length;
//         let query = { deleted: false, user: userId }
//         for (let index = 0; index < length; index++) {
//             query.trader = list[index].id;
//             let promis = Follow.findOne(query);
//             if (promis)
//                 promises.push(createPromise(promis));
//         }
//         let finalResult = await Promise.all(promises);
//         for (let index = 0; index < finalResult.length; index++) {
//             if (finalResult[index]) {
//                 list[index].follow = true;
//             }
//         }
//         return list;
//     } catch (error) {
//         throw error;
//     }
// }
// let checkinFavorites = async (list, userId) => {
//     try {
//         let promises = [];
//         let query = { deleted: false, user: userId }
//         for (let index = 0; index < list.length; index++) {
//             query.trader = list[index].id;
//             let promis = Favorites.findOne(query);
//             if (promis)
//                 promises.push(createPromise(promis));
//         }
//         let finalResult = await Promise.all(promises);
//         for (let index = 0; index < finalResult.length; index++) {
//             if (finalResult[index]) {
//                 list[index].favorite = true;
//             } else {
//                 list[index].favorite = false;
//             }
//         }
//         return list;
//     } catch (error) {
//         throw error;
//     }
// }


var _default = {
  upload: function upload(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var avatar, fileFormat, hash, filename, upload;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (req.files) {
                _context2.next = 5;
                break;
              }

              res.send(500, {
                error: 'No file uploaded'
              });
              _context2.next = 15;
              break;

            case 5:
              //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
              console.log(req);
              avatar = req.files.avatar;
              fileFormat = avatar.name.split('.');
              hash = crypto.createHash('md5').update(avatar.name + new Date()).digest('hex');
              filename = fileFormat[0] + '-' + hash + '.' + fileFormat[fileFormat.length - 1]; //Use the mv() method to place the file in upload directory (i.e. "uploads")

              avatar.mv('./uploads/' + filename); //send response

              _context2.next = 13;
              return _upload["default"].create({
                _id: false,
                link: '/uploads/' + filename,
                file_type: avatar.mimetype,
                user_id: req.user.id
              });

            case 13:
              upload = _context2.sent;
              res.status(200).send(upload);

            case 15:
              _context2.next = 20;
              break;

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](0);
              next(_context2.t0);

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 17]]);
    }))();
  },
  getFile: function getFile(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var id, upload;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              if (req.query.id) {
                _context3.next = 5;
                break;
              }

              res.send(500, {
                error: 'No file uploaded'
              });
              _context3.next = 11;
              break;

            case 5:
              //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
              id = req.query.id; //send response

              _context3.next = 8;
              return _upload["default"].findOne({
                _id: id
              });

            case 8:
              upload = _context3.sent;
              res.type(upload.file_type);
              res.sendFile(process.cwd() + upload.link);

            case 11:
              _context3.next = 16;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              next(_context3.t0);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 13]]);
    }))();
  },
  //     try {
  //         let page = +req.query.page || 1,
  //             limit = +req.query.limit || 20;
  //         var { all, name, type, fromDate, toDate, phone, email, activated, countryKey, countryCode,market,region,
  //             month, year, day, archive , country, categoryName ,removeLanguage,
  //             tradersByMarketName,userId,marketsByCategory,marketsBySubCategories,
  //             marketsByCategoryName,marketByCountry , marketsByRegions,productName,marketsByCity,
  //             subCategory,category,tradersByRegion,driver,mostRated,similarTraders,shopType
  //          } = req.query;
  //         let sortQuery = { Order: 1 };
  //         var query = { deleted: false, type: { $ne: 'VISITOR' } ,phoneVerified:true};
  //         if (archive) query.deleted = true;
  //         if (name) query.$or = [{name:{ '$regex': name, '$options': 'i' }},{$or:[{'username.ar':{ '$regex': name, '$options': 'i' }},{'username.en':{ '$regex': name, '$options': 'i' }}]}];
  //         if (phone) query.phone = { '$regex': phone, '$options': 'i' };
  //         if (email) query.email = { '$regex': email, '$options': 'i' };
  //         if (type) query.type = type;
  //         if (activated) query.activated = activated;
  //         if (countryKey) query.countryKey = countryKey;
  //         if (region) query.region = region;
  //         if (countryCode) query.countryCode = countryCode;
  //         if (driver) query.driver = driver;
  //         if (shopType) query.shopType = shopType;
  //         if (country) {
  //             let userCountries = await Address.find({deleted:false , country :  country }).distinct('user');
  //             query._id = {$in : userCountries}
  //         }
  //         if (categoryName) { // get traders by category name
  //             let nameQuery = [{ 'name.en': { '$regex': categoryName, '$options': 'i' } }, { 'name.ar': { '$regex': categoryName, '$options': 'i' } }]
  //             let catetgories = await SubCategory.find({deleted:false, $or:nameQuery , parent:null }).distinct('_id');
  //             let subCategories = await SubCategory.find({deleted:false, parent : {$in:catetgories}  }).distinct('_id');
  //             query.subCategories = {$in:subCategories} ;
  //         }
  //         if (tradersByMarketName) {
  //             let markets = await User.find({deleted:false,type:'MARKET',name:{ '$regex': tradersByMarketName, '$options': 'i' } }).distinct('_id');
  //             query.market = {$in:markets};
  //         }
  //         if (market) {
  //             query.market = market;
  //         }
  //         if (marketsByCategory) {
  //             if (Array.isArray(marketsByCategory)) {
  //                 let subIds = await categoryModel.find({deleted:false,parent:{$in:marketsByCategory}}).distinct('_id');
  //                 let marketIds = await User.find({deleted:false,subCategories:{$in:subIds}}).distinct('market');
  //                 query._id = {$in:marketIds}
  //             } else if (!isNaN(marketsByCategory)) {
  //                 let subIds = await categoryModel.find({deleted:false,parent:marketsByCategory}).distinct('_id');
  //                 let marketIds = await User.find({deleted:false,subCategories:{$in:subIds}}).distinct('market');
  //                 query._id = {$in:marketIds}
  //             }
  //         }
  //         if (marketsBySubCategories) {
  //             if (Array.isArray(marketsBySubCategories)) {
  //                 let marketIds = await User.find({deleted:false,subCategories:{$in:marketsBySubCategories}}).distinct('market');
  //                 query._id = {$in:marketIds}
  //             } else if (!isNaN(marketsBySubCategories)) {
  //                 let marketIds = await User.find({deleted:false,subCategories:marketsBySubCategories}).distinct('market');
  //                 query._id = {$in:marketIds}
  //             }
  //         }
  //         if (subCategory) {
  //             if (Array.isArray(subCategory)) {
  //                 query.subCategories = {$in:subCategory}
  //             } else if (!isNaN(subCategory)) {
  //                 query.subCategories = subCategory
  //             }
  //         }
  //         if (category) {
  //             if (Array.isArray(category)) {
  //                 let subIds = await categoryModel.find({deleted:false,parent:{$in:category}}).distinct('_id');
  //                 // query.subCategories = {$in:subIds}
  //                 // query.categories = {$in:category}
  //                 query.$or = [{categories :{$in:category}},{subCategories : {$in:subIds}}]
  //             } else if (!isNaN(category)) {
  //                 let subIds = await categoryModel.find({deleted:false,parent:category}).distinct('_id');
  //                 // if(subIds.length != 0) query.subCategories = {$in:subIds}
  //                 // query.categories = {$in:[category]};
  //                 query.$or = [{categories : {$in:[category]}},{subCategories : {$in:subIds}}]
  //             }
  //         }
  //         if (tradersByRegion) {
  //             if (Array.isArray(tradersByRegion)) {
  //                 let marketIds = await User.find({deleted:false,region:{$in:tradersByRegion},type:'MARKET'}).distinct('_id');
  //                 query.market = {$in:marketIds};
  //             } else if (!isNaN(tradersByRegion)) {
  //                 let marketIds = await User.find({deleted:false,region:tradersByRegion,type:'MARKET'}).distinct('_id');
  //                 query.market = {$in:marketIds};
  //             }
  //         }
  //         if(mostRated){
  //             sortQuery = {rate:-1}
  //         }
  //         if(similarTraders){
  //             let currentTrader = await User.findById(similarTraders);
  //             query.$or = [{region: currentTrader.region},{market:currentTrader.market},{market:currentTrader.market},{subCategories:{$in:currentTrader.subCategories}}];
  //             query._id = {$ne:similarTraders};
  //             query.type = 'TRADER'
  //         }
  //         if (marketsByCategoryName) {
  //             let categories = await categoryModel.find({ deleted: false, $or : [{ 'name.en': { '$regex': marketsByCategoryName, '$options': 'i' } }, { 'name.ar': { '$regex': marketsByCategoryName, '$options': 'i' } }], parent: { $eq: null }}).distinct('_id');
  //             let subIds = await categoryModel.find({deleted:false,parent:{$in:categories}}).distinct('_id');
  //             let marketIds = await User.find({deleted:false,subCategories:{$in:subIds}}).distinct('market');
  //             query._id = {$in:marketIds};
  //         }
  //         if (marketsByRegions) {
  //             if (Array.isArray(marketsByRegions)) {
  //                 query.region = {$in:marketsByRegions}
  //             } else if (!isNaN(marketsByRegions)) {
  //                 query.region = marketsByRegions
  //             }
  //         }
  //         if (marketsByCity) {
  //             let regions = [];
  //             if (Array.isArray(marketsByCity)) {
  //                 regions = await Region.find({deleted:false,city:{$in:marketsByCity}}).distinct('_id');
  //             } else if (!isNaN(marketsByCity)) {
  //                 regions = await Region.find({deleted:false,city:marketsByCity}).distinct('_id');
  //             }
  //             query.region = {$in:regions};
  //         }
  //         if (productName) {
  //             let traders = await Product.find({deleted:false,$or: [{ 'name.en': { '$regex': productName, '$options': 'i' } }, { 'name.ar': { '$regex': productName, '$options': 'i' } }]}).distinct('trader');
  //             let marketIds = await User.find({deleted:false,_id:{$in:traders}}).distinct('market');
  //             if (query._id) {
  //                 query.$and = [{_id:query._id},{_id:{$in:marketIds}}];
  //                 delete query._id;
  //             }else{
  //                 query._id = {$in:marketIds};
  //             }
  //         }
  //         if (fromDate && toDate) {
  //             let startOfDate = moment(fromDate).startOf('day');
  //             let endOfDate = moment(toDate).endOf('day');
  //             query.createdAt = { $gte: new Date(startOfDate), $lte: new Date(endOfDate) };
  //         } else if (toDate && !fromDate) {
  //             let endOfDate = moment(toDate).endOf('day');
  //             query.createdAt = { $lte: new Date(endOfDate) };
  //         } else if (fromDate && !toDate) {
  //             let startOfDate = moment(fromDate).startOf('day');
  //             query.createdAt = { $gte: new Date(startOfDate) };
  //         }
  //         let date = new Date();
  //         if (month && year && !day) {
  //             month = month - 1;
  //             date.setMonth(month);
  //             date.setFullYear(year);
  //             let startOfDate = moment(date).startOf('month');
  //             let endOfDate = moment(date).endOf('month');
  //             query.createdAt = { $gte: new Date(startOfDate), $lte: new Date(endOfDate) }
  //         }
  //         if (year && !month) {
  //             date.setFullYear(year);
  //             let startOfDate = moment(date).startOf('year');
  //             let endOfDate = moment(date).endOf('year');
  //             query.createdAt = { $gte: new Date(startOfDate), $lte: new Date(endOfDate) }
  //         }
  //         if (month && year && day) {
  //             month = month - 1;
  //             date.setMonth(month);
  //             date.setFullYear(year);
  //             date.setDate(day);
  //             let startOfDay = moment(date).startOf('day');
  //             let endOfDay = moment(date).endOf('day');
  //             query.createdAt = { $gte: new Date(startOfDay), $lte: new Date(endOfDay) }
  //         }
  //         console.log(query)
  //         let users;
  //         let pageCount;
  //         const userCount = await User.count(query);
  //         if (all) {
  //             users = await User.find(query).populate(populateQuery).sort(sortQuery);
  //             pageCount = 1;
  //         } else {
  //             users = await User.find(query).populate(populateQuery).sort(sortQuery).limit(limit).skip((page - 1) * limit);
  //             pageCount = Math.ceil(userCount / limit);
  //         }
  //         if (userId) {
  //             await checkFollow(users,userId);
  //         }
  //         if (!removeLanguage) {
  //             users = User.schema.methods.toJSONLocalizedOnly(users, i18n.getLocale());
  //         }
  //         res.send(new ApiResponse(users, page, pageCount, limit, userCount, req));
  //     } catch (error) {
  //         next(error)
  //     }
  // },
  validateUserGroup: function validateUserGroup() {
    var validations = [(0, _check.body)('id').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_ar').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name_en').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('permissions').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  userGroup: function userGroup(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var validation, item, newGroupUnit;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              validation = (0, _CheckMethods.checkValidations)(req);
              console.log(validation);
              console.log(req.body);

              if (!validation.id) {
                _context4.next = 10;
                break;
              }

              _context4.next = 7;
              return _user_role["default"].updateOne({
                _id: validation.id
              }, {
                $set: {
                  name_ar: validation.name_ar,
                  name_en: validation.name_en,
                  permissions: validation.permissions
                }
              }, {
                upsert: true
              }, function (err, doc) {
                if (err) return res.send(500, {
                  error: err
                });
                return res.status(200).send(item);
              });

            case 7:
              item = _context4.sent;
              _context4.next = 14;
              break;

            case 10:
              _context4.next = 12;
              return _user_role["default"].create({
                _id: false,
                name_ar: validation.name_ar,
                name_en: validation.name_en,
                permissions: validation.permissions
              });

            case 12:
              newGroupUnit = _context4.sent;
              res.status(200).send(newGroupUnit);

            case 14:
              _context4.next = 19;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 16]]);
    }))();
  },
  getUserGroup: function getUserGroup(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              user = req.user;
              _context5.next = 4;
              return _user_role["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context5.sent;
              console.log(itemGroups);
              res.status(200).send(itemGroups);
              _context5.next = 12;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              next(_context5.t0);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }))();
  },
  delUserGroup: function delUserGroup(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;

              if (!req.query.id) {
                _context6.next = 6;
                break;
              }

              _context6.next = 4;
              return _user_role["default"].updateOne({
                _id: req.query.id
              }, {
                $set: {
                  deleted: true
                }
              }, {
                upsert: true
              }, function (err, doc) {
                if (err) return res.send(500, {
                  error: err
                });
                return res.status(200).send({
                  success: true
                });
              });

            case 4:
              _context6.next = 7;
              break;

            case 6:
              next("delete items group error");

            case 7:
              _context6.next = 12;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              next(_context6.t0);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 9]]);
    }))();
  },

  /***/
  getUsers: function getUsers(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var user, itemGroups;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              user = req.user;
              _context7.next = 4;
              return _user["default"].find({
                deleted: false
              });

            case 4:
              itemGroups = _context7.sent;
              res.status(200).send(itemGroups);
              _context7.next = 11;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](0);
              next(_context7.t0);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 8]]);
    }))();
  },
  validateDeviceId: function validateDeviceId() {
    var validations = [(0, _check.body)('id').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('deviceId').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  CheckDeviceId: function CheckDeviceId(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var validatedBody, query, user, isDevice;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              query = {
                deleted: false
              };
              query = _objectSpread(_objectSpread({}, query), {}, {
                _id: validatedBody.id
              });
              _context8.next = 6;
              return _user["default"].findOne(query);

            case 6:
              user = _context8.sent;

              //.populate(populateQuery);
              if (user) {
                isDevice = user.deviceId != validatedBody.deviceId;
                res.status(200).send({
                  isDevice: isDevice
                });
              }

              _context8.next = 13;
              break;

            case 10:
              _context8.prev = 10;
              _context8.t0 = _context8["catch"](0);
              next(_context8.t0);

            case 13:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 10]]);
    }))();
  },
  validateVerifyPhone: function validateVerifyPhone() {
    return [(0, _check.body)('code').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('codeRequired');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('name').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('nameRequired');
    })];
  },
  validateUserSignin: function validateUserSignin() {
    var validations = [(0, _check.body)('email').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }), (0, _check.body)('password').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validations;
  },
  signIn: function signIn(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var validatedBody, query, user, passwordIsValid, token;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              query = {
                deleted: false,
                email: validatedBody.email
              }; //, type: validatedBody.type };

              _context9.next = 5;
              return _user["default"].findOne(query);

            case 5:
              user = _context9.sent;

              if (!user) {
                _context9.next = 14;
                break;
              }

              passwordIsValid = _bcryptjs["default"].compareSync(req.body.password, user.password);

              if (passwordIsValid) {
                _context9.next = 10;
                break;
              }

              return _context9.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('Invalid Password!'))));

            case 10:
              token = _jsonwebtoken["default"].sign({
                id: user.id
              }, process.env.JWT_SECRET, {
                expiresIn: 86400 // 24 hours

              });
              res.status(200).send({
                id: user._id,
                email: user.email,
                user_role: user.user_role,
                status: user.status,
                password: user.password.lenght > 0,
                token: token
              });
              _context9.next = 15;
              break;

            case 14:
              return _context9.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('userNotFound'))));

            case 15:
              _context9.next = 20;
              break;

            case 17:
              _context9.prev = 17;
              _context9.t0 = _context9["catch"](0);
              next(_context9.t0);

            case 20:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 17]]);
    }))();
  },
  validateAdminSignin: function validateAdminSignin() {
    var validations = [(0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }) //            body('password').not().isEmpty().withMessage(() => { return i18n.__('passwordRequired') }),
    // body('type').not().isEmpty().withMessage(() => { return i18n.__('typeIsRequired') })
    // .isIn(['CLIENT','MARKET','TRADER','DRIVER']).withMessage(() => { return i18n.__('userTypeWrong') }),
    ];
    return validations;
  },
  AdminsignIn: function AdminsignIn(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var validatedBody, query, user;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              query = {
                deleted: false,
                type: {
                  $in: ["ADMIN"]
                }
              }; //, type: validatedBody.type };

              query = _objectSpread(_objectSpread({}, query), getCountryCode(validatedBody.phone));
              _context10.next = 6;
              return _user["default"].findOne(query);

            case 6:
              user = _context10.sent;

              if (!user) {
                _context10.next = 11;
                break;
              }

              // res.status(200).send("send code successfuly")
              if (!testNumber.includes(query.phone)) {
                twilioSend(query.countryCode + query.phone, 'ar', res, next);
              } else {
                res.status(200).send("send code successfuly");
              }

              _context10.next = 12;
              break;

            case 11:
              return _context10.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('userNotFound'))));

            case 12:
              _context10.next = 17;
              break;

            case 14:
              _context10.prev = 14;
              _context10.t0 = _context10["catch"](0);
              next(_context10.t0);

            case 17:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 14]]);
    }))();
  },
  validateUserCreateBody: function validateUserCreateBody() {
    var validations = [// body('name').not().isEmpty().withMessage(() => { return i18n.__('nameRequired') })
    // .custom(async (value, { req }) => {
    //     value = (value.trim());
    //     let userQuery = { username: value, deleted: false };
    //     if (await User.findOne(userQuery))
    //         throw new Error(i18n.__('usernameDuplicated'));
    //     return true;
    // })
    (0, _check.body)('email').trim().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }).isEmail().withMessage(function () {
      return _i18n["default"].__('EmailNotValid');
    }).custom( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(value, _ref2) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                req = _ref2.req;
                value = value.trim().toLowerCase();
                _context11.next = 4;
                return _user["default"].updateMany({
                  email: value,
                  deleted: false,
                  phoneVerified: false
                }, {
                  $set: {
                    deleted: true
                  }
                });

              case 4:
                userQuery = {
                  email: value,
                  deleted: false
                };
                _context11.next = 7;
                return _user["default"].findOne(userQuery);

              case 7:
                if (!_context11.sent) {
                  _context11.next = 9;
                  break;
                }

                throw new Error(_i18n["default"].__('emailDuplicated'));

              case 9:
                return _context11.abrupt("return", true);

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }()), (0, _check.body)('password').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('passwordRequired');
    }), (0, _check.body)('name').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('typeRequired');
    }), (0, _check.body)('type').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('typeRequired');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('PhoneIsRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(value, _ref4) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                req = _ref4.req;
                value = value.trim().toLowerCase();
                _context12.next = 4;
                return _user["default"].updateMany({
                  phone: value,
                  deleted: false,
                  phoneVerified: false
                }, {
                  $set: {
                    deleted: true
                  }
                });

              case 4:
                userQuery = {
                  phone: value,
                  deleted: false
                };
                _context12.next = 7;
                return _user["default"].findOne(userQuery);

              case 7:
                if (!_context12.sent) {
                  _context12.next = 9;
                  break;
                }

                throw new Error(_i18n["default"].__('phoneDuplicated'));

              case 9:
                return _context12.abrupt("return", true);

              case 10:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      return function (_x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    }())];
    return validations;
  },
  userSignUp: function userSignUp(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      var validatedBody, salt, hash, query, createdUser;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              console.log(req.body);
              validatedBody = (0, _CheckMethods.checkValidations)(req);

              if (validatedBody.email) {
                validatedBody.email = validatedBody.email.trim().toLowerCase();
              } // if (req.files && req.files['image'] && (req.files['image'].length > 0)) {
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


              salt = _bcryptjs["default"].genSaltSync();
              _context13.next = 7;
              return _bcryptjs["default"].hash(validatedBody.password, salt);

            case 7:
              hash = _context13.sent;
              validatedBody.password = hash;
              query = _objectSpread({}, validatedBody);
              _context13.next = 12;
              return _user["default"].create(query);

            case 12:
              createdUser = _context13.sent;
              //  createdUser = await User.populate(createdUser,populateQuery);
              //  createdUser = User.schema.methods.toJSONLocalizedOnly(createdUser, i18n.getLocale());
              //adminNSP.to('room-admin').emit(socketEvents.NewSignup, { user: createdUser });
              // res.status(200).send("send code successfuly")
              (0, _sendSms.sendsms)(query.phone, 'ar', res, next); // twilioSend(query.countryCode  + query.phone,'ar',res,next);
              //  res.status(200).send("send code successfuly");
              // twilioSend(query.countryCode  + query.phone,'ar',res,next);

              _context13.next = 19;
              break;

            case 16:
              _context13.prev = 16;
              _context13.t0 = _context13["catch"](0);
              next(_context13.t0);

            case 19:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 16]]);
    }))();
  },
  validateAddUser: function validateAddUser() {
    var validations = [// body('name').not().isEmpty().withMessage(() => { return i18n.__('nameRequired') })
    // .custom(async (value, { req }) => {
    //     value = (value.trim());
    //     let userQuery = { username: value, deleted: false };
    //     if (await User.findOne(userQuery))
    //         throw new Error(i18n.__('usernameDuplicated'));
    //     return true;
    // })
    (0, _check.body)('email').trim().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }).isEmail().withMessage(function () {
      return _i18n["default"].__('EmailNotValid');
    }).custom( /*#__PURE__*/function () {
      var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(value, _ref6) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                req = _ref6.req;
                value = value.trim().toLowerCase();
                _context14.next = 4;
                return _user["default"].updateMany({
                  email: value,
                  deleted: false,
                  phoneVerified: false
                }, {
                  $set: {
                    deleted: true
                  }
                });

              case 4:
                userQuery = {
                  email: value,
                  deleted: false
                };
                _context14.next = 7;
                return _user["default"].findOne(userQuery);

              case 7:
                if (!_context14.sent) {
                  _context14.next = 9;
                  break;
                }

                throw new Error(_i18n["default"].__('emailDuplicated'));

              case 9:
                return _context14.abrupt("return", true);

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      return function (_x7, _x8) {
        return _ref7.apply(this, arguments);
      };
    }()), (0, _check.body)('name').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('Name Required');
    }), (0, _check.body)('user_role').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('User Role Required');
    }), (0, _check.body)('landline').withMessage(function () {
      return _i18n["default"].__('landline Required');
    }), (0, _check.body)('photo').withMessage(function () {
      return _i18n["default"].__('photo Required');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('PhoneIsRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(value, _ref8) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                req = _ref8.req;
                value = value.trim().toLowerCase();
                _context15.next = 4;
                return _user["default"].updateMany({
                  phone: value,
                  deleted: false,
                  phoneVerified: false
                }, {
                  $set: {
                    deleted: true
                  }
                });

              case 4:
                userQuery = {
                  phone: value,
                  deleted: false
                };
                _context15.next = 7;
                return _user["default"].findOne(userQuery);

              case 7:
                if (!_context15.sent) {
                  _context15.next = 9;
                  break;
                }

                throw new Error(_i18n["default"].__('phoneDuplicated'));

              case 9:
                return _context15.abrupt("return", true);

              case 10:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      return function (_x9, _x10) {
        return _ref9.apply(this, arguments);
      };
    }())];
    return validations;
  },
  addUser: function addUser(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      var validatedBody, query, createdUser;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);

              if (validatedBody.email) {
                validatedBody.email = validatedBody.email.trim().toLowerCase();
              } // if (req.files && req.files['image'] && (req.files['image'].length > 0)) {
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


              query = _objectSpread(_objectSpread({}, validatedBody), {}, {
                type: "ADMIN"
              });
              _context16.next = 6;
              return _user["default"].create(query);

            case 6:
              createdUser = _context16.sent;
              //  createdUser = await User.populate(createdUser,populateQuery);
              //  createdUser = User.schema.methods.toJSONLocalizedOnly(createdUser, i18n.getLocale());
              //adminNSP.to('room-admin').emit(socketEvents.NewSignup, { user: createdUser });
              res.status(200).send({
                success: "User added successfuly"
              }); // twilioSend(query.countryCode  + query.phone,'ar',res,next);
              //  res.status(200).send("send code successfuly");
              // twilioSend(query.countryCode  + query.phone,'ar',res,next);

              _context16.next = 13;
              break;

            case 10:
              _context16.prev = 10;
              _context16.t0 = _context16["catch"](0);
              next(_context16.t0);

            case 13:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[0, 10]]);
    }))();
  },
  validateVerifySign: function validateVerifySign() {
    return [(0, _check.body)('code').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('codeRequired');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
  },
  verifySignIn: function verifySignIn(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
      var validatedBody, temp, user;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req); // var phone = validatedBody.phone;
              // phone = phone.trim()

              validatedBody = _objectSpread(_objectSpread({}, validatedBody), getCountryCode(validatedBody.phone));
              _context17.next = 5;
              return _user["default"].findOne({
                phone: validatedBody.phone,
                deleted: false
              });

            case 5:
              temp = _context17.sent;
              _context17.next = 8;
              return _user["default"].findOne({
                phone: validatedBody.phone,
                deleted: false
              }).populate({
                path: "TripId",
                model: temp.isDriver ? "onlineCar" : "onlineMsfr"
              });

            case 8:
              user = _context17.sent;

              if (user) {
                _context17.next = 11;
                break;
              }

              return _context17.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('userNotFound'))));

            case 11:
              //
              if (!testNumber.includes(validatedBody.phone)) {
                twilioVerify(validatedBody.countryCode + validatedBody.phone, validatedBody.code, user, res, next);
              } else {
                res.status(200).send(user);
              }

              _context17.next = 17;
              break;

            case 14:
              _context17.prev = 14;
              _context17.t0 = _context17["catch"](0);
              next(_context17.t0);

            case 17:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[0, 14]]);
    }))();
  },
  validateVerifyAdminSign: function validateVerifyAdminSign() {
    return [(0, _check.body)('code').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('codeRequired');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
  },
  verifyAdminSignIn: function verifyAdminSignIn(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
      var validatedBody, user;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req); // var phone = validatedBody.phone;
              // phone = phone.trim()

              validatedBody = _objectSpread(_objectSpread({}, validatedBody), getCountryCode(validatedBody.phone));
              _context18.next = 5;
              return _user["default"].findOne({
                phone: validatedBody.phone,
                deleted: false
              });

            case 5:
              user = _context18.sent;

              if (user) {
                _context18.next = 8;
                break;
              }

              return _context18.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('userNotFound'))));

            case 8:
              if (!testNumber.includes(validatedBody.phone)) {
                twilioVerify(validatedBody.countryCode + validatedBody.phone, validatedBody.code, user, res, next);
              } else {
                res.status(200).send(user);
              } // res.status(200).send(user)


              _context18.next = 14;
              break;

            case 11:
              _context18.prev = 11;
              _context18.t0 = _context18["catch"](0);
              next(_context18.t0);

            case 14:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, null, [[0, 11]]);
    }))();
  },
  getUserInfo: function getUserInfo(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
      var temp, user, band;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.prev = 0;
              _context19.next = 3;
              return _user["default"].findOne({
                _id: req.query.userId || -1,
                deleted: false
              });

            case 3:
              temp = _context19.sent;
              _context19.next = 6;
              return _user["default"].findOne({
                _id: req.query.userId || -1,
                deleted: false
              }).populate({
                path: "TripId",
                model: temp.isDriver ? "onlineCar" : "onlineMsfr"
              });

            case 6:
              user = _context19.sent;

              if (user) {
                _context19.next = 9;
                break;
              }

              return _context19.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('userNotFound'))));

            case 9:
              _context19.next = 11;
              return bandedModel.findOne({
                deviceId: user.deviceId
              });

            case 11:
              band = _context19.sent;
              user;
              res.status(200).send({
                user: user,
                band: band
              });
              _context19.next = 19;
              break;

            case 16:
              _context19.prev = 16;
              _context19.t0 = _context19["catch"](0);
              next(_context19.t0);

            case 19:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, null, [[0, 16]]);
    }))();
  },
  verifyPhone: function verifyPhone(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
      var validatedBody, user;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req); // var phone = validatedBody.phone;
              // phone = phone.trim()

              validatedBody = _objectSpread(_objectSpread({}, validatedBody), getCountryCode(validatedBody.phone)); // var user = await User.findOne({ phone: phone, deleted: false });
              // if (!user)
              //     return next(new ApiError(403, i18n.__('userNotFound')));

              validatedBody.country = validatedBody.countryCode == "+967" ? "YE" : "SA";
              _context20.next = 6;
              return _user["default"].create(validatedBody);

            case 6:
              user = _context20.sent;

              // res.status(200).send(user)
              if (!testNumber.includes(validatedBody.phone)) {
                twilioVerify(validatedBody.countryCode + validatedBody.phone, validatedBody.code, {}, res, next, {
                  Model: _user["default"],
                  query: validatedBody
                });
              } else {
                res.status(200).send(user);
              }

              _context20.next = 13;
              break;

            case 10:
              _context20.prev = 10;
              _context20.t0 = _context20["catch"](0);
              next(_context20.t0);

            case 13:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, null, [[0, 10]]);
    }))();
  },
  validateResendCode: function validateResendCode() {
    return [(0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
  },
  resendCode: function resendCode(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
      var validatedBody, query;
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              try {
                validatedBody = (0, _CheckMethods.checkValidations)(req); // var phone = validatedBody.phone;
                // phone = phone.trim()
                // var user = await User.findOne({ phone: phone, deleted: false });
                // if (!user)
                //     return next(new ApiError(403, i18n.__('userNotFound')));

                query = _objectSpread(_objectSpread({}, validatedBody), getCountryCode(validatedBody.phone));

                if (!testNumber.includes(query.phone)) {
                  twilioSend(query.countryCode + query.phone, 'ar', res, next);
                } else {
                  res.status(200).send("send code successfuly");
                } // twilioSend(validatedBody.countryCode  + validatedBody.phone, 'ar');
                // res.status(200).send()

              } catch (err) {
                next(err);
              }

            case 1:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }))();
  },
  ///////////////////////////////////////////////////////// in update profile
  validateUpdateToken: function validateUpdateToken() {
    var validation = [(0, _check.body)('token').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    }), (0, _check.body)('user').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
    return validation;
  },
  updateToken: function updateToken(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
      var userId, validatedBody, data, user;
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.prev = 0;
              userId = req.user;

              if (!(userId !== null)) {
                _context22.next = 15;
                break;
              }

              validatedBody = (0, _CheckMethods.checkValidations)(req);
              console.log(validatedBody);
              data = {};
              _context22.next = 8;
              return _user["default"].findOne({
                deleted: false,
                _id: validatedBody.user
              });

            case 8:
              user = _context22.sent;
              user.token = validatedBody.token;
              _context22.next = 12;
              return user.save();

            case 12:
              res.status(200).send();
              _context22.next = 16;
              break;

            case 15:
              next('user_error');

            case 16:
              _context22.next = 22;
              break;

            case 18:
              _context22.prev = 18;
              _context22.t0 = _context22["catch"](0);
              console.log(_context22.t0);
              next(_context22.t0);

            case 22:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22, null, [[0, 18]]);
    }))();
  },
  sendActivateCode: function sendActivateCode(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
      var user, validatedBody, phone;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              try {
                user = req.user;
                validatedBody = (0, _CheckMethods.checkValidations)(req);
                phone = validatedBody.phone;
                phone = phone.trim(); // twilioSend(config.countryCode  + phone, user.language || 'ar');

                res.status(200).send();
              } catch (err) {
                next(err);
              }

            case 1:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    }))();
  },
  confirmActivateCode: function confirmActivateCode(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
      var validatedBody, phone;
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              try {
                validatedBody = (0, _CheckMethods.checkValidations)(req);
                phone = validatedBody.phone;
                phone = phone.trim(); // twilioVerify( config.countryCode  + phone, validatedBody.code, null, res, next);
              } catch (err) {
                next(err);
              }

            case 1:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    }))();
  },
  /////////////////////////////////////////////////////////
  validateCheckPhone: function validateCheckPhone() {
    return [(0, _check.body)('phone').trim().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('PhoneIsRequired');
    })];
  },
  checkExistPhone: function checkExistPhone(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
      var phone, exist;
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.prev = 0;
              phone = (0, _CheckMethods.checkValidations)(req).phone;
              _context25.next = 4;
              return _user["default"].findOne({
                phone: phone,
                deleted: false
              });

            case 4:
              exist = _context25.sent;
              return _context25.abrupt("return", res.status(200).send({
                duplicated: exist ? true : false
              }));

            case 8:
              _context25.prev = 8;
              _context25.t0 = _context25["catch"](0);
              next(_context25.t0);

            case 11:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25, null, [[0, 8]]);
    }))();
  },
  validateCheckEmail: function validateCheckEmail() {
    return [(0, _check.body)('email').trim().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    })];
  },
  checkExistEmail: function checkExistEmail(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
      var email, exist;
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              _context26.prev = 0;
              email = (0, _CheckMethods.checkValidations)(req).email.toLowerCase();
              _context26.next = 4;
              return _user["default"].findOne({
                email: email,
                deleted: false
              });

            case 4:
              exist = _context26.sent;
              return _context26.abrupt("return", res.status(200).send({
                duplicated: exist ? true : false
              }));

            case 8:
              _context26.prev = 8;
              _context26.t0 = _context26["catch"](0);
              next(_context26.t0);

            case 11:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26, null, [[0, 8]]);
    }))();
  },
  validateUserUpdate: function validateUserUpdate() {
    var validations = [(0, _check.body)('categories').optional().isArray().withMessage(function () {
      return _i18n["default"].__('categoriesRequired');
    }), (0, _check.body)('categories.*.en').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('categoryRequired');
    }), (0, _check.body)('categories.*.ar').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('categoryRequired');
    }), (0, _check.body)('traderMarketAddress').optional(), (0, _check.body)('storeEmployees').optional().isArray().withMessage('must be an array'), // body('workTimes').optional(),
    (0, _check.body)('workDays').optional().isArray().withMessage(function () {
      return _i18n["default"].__('invalidWorkDays');
    }), (0, _check.body)('workPeriods').optional().isArray().withMessage(function () {
      return _i18n["default"].__('invalidWorkPeriods');
    }), (0, _check.body)('workPeriods.*.from').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('fromRequired');
    }), (0, _check.body)('workPeriods.*.to').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('toRequired');
    }), (0, _check.body)('subCategories').optional().isArray().withMessage(function () {
      return _i18n["default"].__('subCategoriesRequired');
    }), (0, _check.body)('subCategories.*').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('subCategoryRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(value) {
        return _regenerator["default"].wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                _context27.next = 2;
                return checkExist(value, SubCategory, {
                  deleted: false
                });

              case 2:
                return _context27.abrupt("return", true);

              case 3:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27);
      }));

      return function (_x11) {
        return _ref10.apply(this, arguments);
      };
    }()), (0, _check.body)('slider').optional().isArray().withMessage(function () {
      return _i18n["default"].__('sliderRequired');
    }), (0, _check.body)('searchKeys').optional().isArray().withMessage(function () {
      return _i18n["default"].__('searchKeysRequired');
    }), (0, _check.body)('phones').optional().isArray().withMessage(function () {
      return _i18n["default"].__('invalidPhonesValue');
    }), // .not().isEmpty().withMessage(() => { return i18n.__('phonesRequired') })
    (0, _check.body)('socialLinks').optional().isArray().withMessage(function () {
      return _i18n["default"].__('socialLinksValueError');
    }), (0, _check.body)('socialLinks.*.key').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('socialLinksRequired');
    }), (0, _check.body)('socialLinks.*.value').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('socialLinksRequired');
    }), (0, _check.body)('location.address').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('addressRequired');
    }), (0, _check.body)('location.longitude').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('longitudeRequired');
    }), (0, _check.body)('location.latitude').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('latitudeRequired');
    }), (0, _check.body)('market').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('marketRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(val, _ref11) {
        var req;
        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                req = _ref11.req;
                _context28.next = 3;
                return checkExist(val, _user["default"], {
                  deleted: false,
                  type: 'MARKET'
                });

              case 3:
                return _context28.abrupt("return", true);

              case 4:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28);
      }));

      return function (_x12, _x13) {
        return _ref12.apply(this, arguments);
      };
    }()), (0, _check.body)('shopType').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('shopTypeRequired');
    }).isIn(['RETAIL', 'WHOLESALE', 'ALL']).withMessage(function () {
      return _i18n["default"].__('invalidShopType');
    }), (0, _check.body)('name').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('nameRequired');
    }), (0, _check.body)('email').optional().trim().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }).isEmail().withMessage(function () {
      return _i18n["default"].__('Email Not Valid');
    }).custom( /*#__PURE__*/function () {
      var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(value, _ref13) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                req = _ref13.req;
                value = value.trim().toLowerCase();
                _context29.next = 4;
                return _user["default"].updateMany({
                  email: value,
                  deleted: false,
                  phoneVerified: false
                }, {
                  $set: {
                    deleted: true
                  }
                });

              case 4:
                userQuery = {
                  _id: {
                    $ne: req.user.id
                  },
                  email: value,
                  deleted: false
                };
                _context29.next = 7;
                return _user["default"].findOne(userQuery);

              case 7:
                if (!_context29.sent) {
                  _context29.next = 11;
                  break;
                }

                throw new Error(_i18n["default"].__('emailDuplicated'));

              case 11:
                return _context29.abrupt("return", true);

              case 12:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29);
      }));

      return function (_x14, _x15) {
        return _ref14.apply(this, arguments);
      };
    }()), (0, _check.body)('phone').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('PhoneIsRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(value, _ref15) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                req = _ref15.req;
                value = value.trim().toLowerCase();
                _context30.next = 4;
                return _user["default"].updateMany({
                  phone: value,
                  deleted: false,
                  phoneVerified: false
                }, {
                  $set: {
                    deleted: true
                  }
                });

              case 4:
                userQuery = {
                  _id: {
                    $ne: req.user.id
                  },
                  phone: value,
                  deleted: false
                };
                _context30.next = 7;
                return _user["default"].findOne(userQuery);

              case 7:
                if (!_context30.sent) {
                  _context30.next = 11;
                  break;
                }

                throw new Error(_i18n["default"].__('phoneDuplicated'));

              case 11:
                return _context30.abrupt("return", true);

              case 12:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30);
      }));

      return function (_x16, _x17) {
        return _ref16.apply(this, arguments);
      };
    }()), (0, _check.body)('language').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('languageRequired');
    }).isIn(['ar', 'en']), (0, _check.body)('notification').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('notificationRequired');
    }), (0, _check.body)('newPassword').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('newPasswordRequired');
    }), (0, _check.body)('currentPassword').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('CurrentPasswordRequired');
    }), (0, _check.body)('countryCode').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('countryCodeRequired');
    }), (0, _check.body)('countryKey').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('countryKeyRequired');
    }), (0, _check.body)('streetNumber').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('streetNumberRequired');
    }), (0, _check.body)('region').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('regionRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(val, _ref17) {
        var req;
        return _regenerator["default"].wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                req = _ref17.req;
                _context31.next = 3;
                return checkExist(val, Region, {
                  deleted: false
                });

              case 3:
                return _context31.abrupt("return", true);

              case 4:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31);
      }));

      return function (_x18, _x19) {
        return _ref18.apply(this, arguments);
      };
    }()), (0, _check.body)('subscription').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('subscriptionRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32(val, _ref19) {
        var req;
        return _regenerator["default"].wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                req = _ref19.req;
                _context32.next = 3;
                return checkExist(val, Subscription, {
                  deleted: false
                });

              case 3:
                return _context32.abrupt("return", true);

              case 4:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32);
      }));

      return function (_x20, _x21) {
        return _ref20.apply(this, arguments);
      };
    }())];
    return validations;
  },
  updateInfo: function updateInfo(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
      var userId, validatedBody, data, user, newSlider, salt, hash;
      return _regenerator["default"].wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              _context33.prev = 0;
              userId = req.user.id;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              data = {};
              _context33.next = 6;
              return checkExistThenGet(userId, _user["default"], {
                deleted: false
              });

            case 6:
              user = _context33.sent;

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
                };
                validatedBody.address = validatedBody.location.address;
              }

              if (validatedBody.email) {
                validatedBody.email = validatedBody.email.trim().toLowerCase();
              }

              if (req.files && req.files['image'] && req.files['image'].length > 0) {
                validatedBody.image = fieldhandleImg(req, {
                  attributeName: 'image',
                  isUpdate: false
                })[0];
              }

              if (req.files && req.files['commercialRecord'] && req.files['commercialRecord'].length > 0) {
                validatedBody.commercialRecord = fieldhandleImg(req, {
                  attributeName: 'commercialRecord',
                  isUpdate: false
                })[0];
              }

              if (req.files && req.files['taxCard'] && req.files['taxCard'].length > 0) {
                validatedBody.taxCard = fieldhandleImg(req, {
                  attributeName: 'taxCard',
                  isUpdate: false
                })[0];
              }

              if (validatedBody.slider && req.files && req.files['newSlider'] && req.files['newSlider'].length > 0) {
                newSlider = fieldhandleImg(req, {
                  attributeName: 'newSlider',
                  isUpdate: false
                });
                validatedBody.slider = validatedBody.slider.concat(newSlider);
              } else if (req.files && req.files['newSlider'] && req.files['newSlider'].length > 0) {
                validatedBody.slider = fieldhandleImg(req, {
                  attributeName: 'newSlider',
                  isUpdate: false
                });
              }

              if (!validatedBody.newPassword) {
                _context33.next = 37;
                break;
              }

              if (!validatedBody.currentPassword) {
                _context33.next = 34;
                break;
              }

              if (!_bcryptjs["default"].compareSync(validatedBody.currentPassword, user.password)) {
                _context33.next = 31;
                break;
              }

              salt = _bcryptjs["default"].genSaltSync();
              _context33.next = 21;
              return _bcryptjs["default"].hash(validatedBody.newPassword, salt);

            case 21:
              hash = _context33.sent;
              validatedBody.password = hash;
              delete validatedBody.newPassword;
              delete validatedBody.currentPassword;
              _context33.next = 27;
              return _user["default"].findOneAndUpdate({
                deleted: false,
                _id: userId
              }, _objectSpread(_objectSpread({}, validatedBody), data), {
                "new": true
              }).populate(populateQuery);

            case 27:
              user = _context33.sent;
              res.status(200).send(user);
              _context33.next = 32;
              break;

            case 31:
              return _context33.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('currentPasswordInvalid'))));

            case 32:
              _context33.next = 35;
              break;

            case 34:
              return _context33.abrupt("return", res.status(400).send({
                error: [{
                  location: 'body',
                  param: 'currentPassword',
                  msg: _i18n["default"].__('CurrentPasswordRequired')
                }]
              }));

            case 35:
              _context33.next = 41;
              break;

            case 37:
              _context33.next = 39;
              return _user["default"].findOneAndUpdate({
                deleted: false,
                _id: userId
              }, _objectSpread(_objectSpread({}, validatedBody), data), {
                "new": true
              }).populate(populateQuery);

            case 39:
              user = _context33.sent;
              res.status(200).send(user);

            case 41:
              _context33.next = 46;
              break;

            case 43:
              _context33.prev = 43;
              _context33.t0 = _context33["catch"](0);
              next(_context33.t0);

            case 46:
            case "end":
              return _context33.stop();
          }
        }
      }, _callee33, null, [[0, 43]]);
    }))();
  },
  validateUpdatedPassword: function validateUpdatedPassword() {
    var validation = [(0, _check.body)('newPassword').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('newPasswordRequired');
    }), (0, _check.body)('currentPassword').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('CurrentPasswordRequired');
    })];
    return validation;
  },
  updatePasswordFromProfile: function updatePasswordFromProfile(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
      var validatedBody, user, salt, hash;
      return _regenerator["default"].wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              _context34.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              user = req.user;

              if (!_bcryptjs["default"].compareSync(validatedBody.currentPassword, user.password)) {
                _context34.next = 17;
                break;
              }

              salt = _bcryptjs["default"].genSaltSync();
              _context34.next = 7;
              return _bcryptjs["default"].hash(validatedBody.newPassword, salt);

            case 7:
              hash = _context34.sent;
              validatedBody.password = hash;
              delete validatedBody.newPassword;
              delete validatedBody.currentPassword;
              _context34.next = 13;
              return _user["default"].findOneAndUpdate({
                deleted: false,
                _id: user.id
              }, validatedBody, {
                "new": true
              }).populate(populateQuery);

            case 13:
              user = _context34.sent;
              res.status(200).send({
                user: user
              });
              _context34.next = 18;
              break;

            case 17:
              return _context34.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('currentPasswordInvalid'))));

            case 18:
              _context34.next = 23;
              break;

            case 20:
              _context34.prev = 20;
              _context34.t0 = _context34["catch"](0);
              next(_context34.t0);

            case 23:
            case "end":
              return _context34.stop();
          }
        }
      }, _callee34, null, [[0, 20]]);
    }))();
  },
  /////////////////////////////////////////////////////////////////////////////////////////// forget password by email
  validateForgetPassword: function validateForgetPassword() {
    return [(0, _check.body)('email').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }), (0, _check.body)('type').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('typeIsRequired');
    }).isIn(['ADMIN', 'SUB_ADMIN', 'CLIENT', 'VISITOR', 'MARKET', 'TRADER', 'DRIVER']).withMessage(function () {
      return _i18n["default"].__('userTypeWrong');
    })];
  },
  forgetPassword: function forgetPassword(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
      var validatedBody, email, user, randomCode, code, text;
      return _regenerator["default"].wrap(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              _context35.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              email = validatedBody.email;
              email = email.trim().toLowerCase();
              _context35.next = 6;
              return _user["default"].findOne({
                email: email,
                deleted: false,
                type: validatedBody.type
              });

            case 6:
              user = _context35.sent;

              if (user) {
                _context35.next = 9;
                break;
              }

              return _context35.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('EmailNotFound'))));

            case 9:
              randomCode = '' + Math.floor(1000 + Math.random() * 9000);
              code = new ConfirmationCode({
                email: email,
                code: randomCode
              });
              _context35.next = 13;
              return code.save();

            case 13:
              text = 'Enter This Code To Change Your Password ' + randomCode + ' .';
              _context35.next = 16;
              return sendEmail(email, text);

            case 16:
              res.status(200).send(_i18n["default"].__('checkYourMail'));
              _context35.next = 22;
              break;

            case 19:
              _context35.prev = 19;
              _context35.t0 = _context35["catch"](0);
              next(_context35.t0);

            case 22:
            case "end":
              return _context35.stop();
          }
        }
      }, _callee35, null, [[0, 19]]);
    }))();
  },
  validateConfirmCode: function validateConfirmCode() {
    return [(0, _check.body)('email').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }), (0, _check.body)('code').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('codeRequired');
    }), (0, _check.body)('type').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('typeIsRequired');
    }).isIn(['ADMIN', 'SUB_ADMIN', 'CLIENT', 'VISITOR', 'MARKET', 'TRADER', 'DRIVER']).withMessage(function () {
      return _i18n["default"].__('userTypeWrong');
    })];
  },
  verifyForgetPasswordCode: function verifyForgetPasswordCode(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
      var validatedBody, email, code, user;
      return _regenerator["default"].wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              _context36.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              email = validatedBody.email;
              code = validatedBody.code;
              email = email.trim().toLowerCase();
              _context36.next = 7;
              return ConfirmationCode.findOne({
                code: code,
                email: email
              });

            case 7:
              user = _context36.sent;

              if (!user) {
                _context36.next = 14;
                break;
              }

              _context36.next = 11;
              return ConfirmationCode.remove({
                code: code,
                email: email
              });

            case 11:
              res.status(200).send(_i18n["default"].__('CodeSuccess'));
              _context36.next = 15;
              break;

            case 14:
              res.status(400).send(_i18n["default"].__('CodeFail'));

            case 15:
              _context36.next = 20;
              break;

            case 17:
              _context36.prev = 17;
              _context36.t0 = _context36["catch"](0);
              next(_context36.t0);

            case 20:
            case "end":
              return _context36.stop();
          }
        }
      }, _callee36, null, [[0, 17]]);
    }))();
  },
  updatePassword: function updatePassword(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
      var validatedBody, salt, hash, password, user;
      return _regenerator["default"].wrap(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              _context37.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              validatedBody.email = validatedBody.email.trim().toLowerCase();
              salt = _bcryptjs["default"].genSaltSync();
              _context37.next = 6;
              return _bcryptjs["default"].hash(validatedBody.newPassword, salt);

            case 6:
              hash = _context37.sent;
              password = hash;
              _context37.next = 10;
              return _user["default"].findOneAndUpdate({
                email: validatedBody.email,
                deleted: false,
                type: validatedBody.type
              }, {
                password: password
              }, {
                "new": true
              }).populate(populateQuery);

            case 10:
              user = _context37.sent;

              if (user) {
                res.status(200).send({
                  user: user,
                  token: generateToken(user.id)
                });
              } else res.status(404).send(_i18n["default"].__('EmailNotFound'));

              _context37.next = 17;
              break;

            case 14:
              _context37.prev = 14;
              _context37.t0 = _context37["catch"](0);
              next(_context37.t0);

            case 17:
            case "end":
              return _context37.stop();
          }
        }
      }, _callee37, null, [[0, 14]]);
    }))();
  },
  ////////////////////////////////////////////////////////////////////////// forget password by phone
  validateForgetPasswordByPhone: function validateForgetPasswordByPhone() {
    return [(0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
  },
  forgetPasswordByPhone: function forgetPasswordByPhone(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
      var validatedBody, phone, user;
      return _regenerator["default"].wrap(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              _context38.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              phone = validatedBody.phone;
              phone = phone.trim();
              _context38.next = 6;
              return _user["default"].findOne({
                phone: phone,
                deleted: false
              });

            case 6:
              user = _context38.sent;

              if (user) {
                _context38.next = 9;
                break;
              }

              return _context38.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('userNotFound'))));

            case 9:
              // twilioSend(config.countryCode  + phone, user.language || 'ar');
              res.status(200).send(_i18n["default"].__('checkYourPhone'));
              _context38.next = 15;
              break;

            case 12:
              _context38.prev = 12;
              _context38.t0 = _context38["catch"](0);
              next(_context38.t0);

            case 15:
            case "end":
              return _context38.stop();
          }
        }
      }, _callee38, null, [[0, 12]]);
    }))();
  },
  validateVerifyForgetPasswordByPhone: function validateVerifyForgetPasswordByPhone() {
    return [(0, _check.body)('code').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('codeRequired');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
  },
  verifyForgetPasswordByPhone: function verifyForgetPasswordByPhone(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee39() {
      var validatedBody, phone, user;
      return _regenerator["default"].wrap(function _callee39$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              _context39.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              phone = validatedBody.phone;
              phone = phone.trim();
              _context39.next = 6;
              return _user["default"].findOne({
                phone: phone,
                deleted: false
              });

            case 6:
              user = _context39.sent;

              if (user) {
                _context39.next = 9;
                break;
              }

              return _context39.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('userNotFound'))));

            case 9:
              _context39.next = 14;
              break;

            case 11:
              _context39.prev = 11;
              _context39.t0 = _context39["catch"](0);
              next(_context39.t0);

            case 14:
            case "end":
              return _context39.stop();
          }
        }
      }, _callee39, null, [[0, 11]]);
    }))();
  },
  validateUpdatePasswordByPhone: function validateUpdatePasswordByPhone() {
    return [(0, _check.body)('password').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('passwordRequired ');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phoneRequired');
    })];
  },
  updatePasswordByPhone: function updatePasswordByPhone(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee40() {
      var validatedBody, user;
      return _regenerator["default"].wrap(function _callee40$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              _context40.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              validatedBody.phone = validatedBody.phone.trim();
              _context40.next = 5;
              return _user["default"].findOne({
                deleted: false,
                phone: validatedBody.phone
              });

            case 5:
              user = _context40.sent;

              if (user) {
                _context40.next = 8;
                break;
              }

              return _context40.abrupt("return", next(new _ApiError["default"](403, _i18n["default"].__('userNotFound'))));

            case 8:
              user.password = validatedBody.password;
              _context40.next = 11;
              return user.save();

            case 11:
              res.status(200).send({
                user: user,
                token: generateToken(user.id)
              });
              _context40.next = 17;
              break;

            case 14:
              _context40.prev = 14;
              _context40.t0 = _context40["catch"](0);
              next(_context40.t0);

            case 17:
            case "end":
              return _context40.stop();
          }
        }
      }, _callee40, null, [[0, 14]]);
    }))();
  },
  ////////////////////////////////////////////////////////////////////////////////////////// reset password
  validateResetPassword: function validateResetPassword() {
    return [(0, _check.body)('email').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }), (0, _check.body)('newPassword').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('newPasswordRequired');
    }), (0, _check.body)('type').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('typeIsRequired');
    }).isIn(['ADMIN', 'SUB_ADMIN', 'CLIENT', 'VISITOR', 'MARKET', 'TRADER']).withMessage(function () {
      return _i18n["default"].__('userTypeWrong');
    })];
  },
  resetPassword: function resetPassword(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee41() {
      var validatedBody, user;
      return _regenerator["default"].wrap(function _callee41$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              _context41.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              _context41.next = 4;
              return checkUserExistByEmail(validatedBody.email);

            case 4:
              user = _context41.sent;
              user.password = validatedBody.newPassword;
              _context41.next = 8;
              return user.save();

            case 8:
              _context41.next = 10;
              return reportController.create({
                "ar": 'تغير الرقم السري لمستخدم ',
                "en": "Change Password"
              }, 'UPDATE', req.user.id);

            case 10:
              res.status(200).send();
              _context41.next = 16;
              break;

            case 13:
              _context41.prev = 13;
              _context41.t0 = _context41["catch"](0);
              next(_context41.t0);

            case 16:
            case "end":
              return _context41.stop();
          }
        }
      }, _callee41, null, [[0, 13]]);
    }))();
  },
  //////////////////////////////////////////////////////////////////////////////////////////
  validateAddToken: function validateAddToken() {
    var validations = [(0, _check.body)('token').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('token is required');
    }), (0, _check.body)('type').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('type is required');
    }).isIn(['ios', 'android', 'web']).withMessage(function () {
      return _i18n["default"].__('wrong type');
    })];
    return validations;
  },
  addToken: function addToken(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee42() {
      var validatedBody, user, tokens, found, index, q, doc, newdoc, newUser;
      return _regenerator["default"].wrap(function _callee42$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              _context42.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              _context42.next = 4;
              return checkExistThenGet(req.user.id, _user["default"], {
                deleted: false
              });

            case 4:
              user = _context42.sent;
              tokens = user.tokens;
              found = false;

              for (index = 0; index < tokens.length; index++) {
                if (tokens[index].token == validatedBody.token) {
                  found = true;
                }
              }

              if (found) {
                _context42.next = 28;
                break;
              }

              user.tokens.push(validatedBody);
              q = {
                token: validatedBody.token,
                deleted: false
              };
              _context42.next = 13;
              return Hash.findOne(q);

            case 13:
              doc = _context42.sent;

              if (!doc) {
                _context42.next = 24;
                break;
              }

              if (!(req.user.id != doc.user)) {
                _context42.next = 22;
                break;
              }

              _context42.next = 18;
              return Hash.findOneAndUpdate(q, {
                user: req.user.id
              });

            case 18:
              newdoc = _context42.sent;
              _context42.next = 21;
              return _user["default"].findByIdAndUpdate(doc.user, {
                $pull: {
                  tokens: {
                    token: validatedBody.token
                  }
                }
              }, {
                "new": true
              });

            case 21:
              newUser = _context42.sent;

            case 22:
              _context42.next = 26;
              break;

            case 24:
              _context42.next = 26;
              return Hash.create({
                token: validatedBody.token,
                user: req.user.id
              });

            case 26:
              _context42.next = 28;
              return user.save();

            case 28:
              res.status(200).send({
                user: user
              });
              _context42.next = 34;
              break;

            case 31:
              _context42.prev = 31;
              _context42.t0 = _context42["catch"](0);
              next(_context42.t0);

            case 34:
            case "end":
              return _context42.stop();
          }
        }
      }, _callee42, null, [[0, 31]]);
    }))();
  },
  validateLogout: function validateLogout() {
    return [(0, _check.body)('token').not().isEmpty().withMessage('tokenRequired')];
  },
  logout: function logout(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee43() {
      var token, user, tokens, i;
      return _regenerator["default"].wrap(function _callee43$(_context43) {
        while (1) {
          switch (_context43.prev = _context43.next) {
            case 0:
              _context43.prev = 0;
              token = req.body.token;
              _context43.next = 4;
              return checkExistThenGet(req.user._id, _user["default"], {
                deleted: false
              });

            case 4:
              user = _context43.sent;
              tokens = [];

              for (i = 0; i < user.tokens.length; i++) {
                if (user.tokens[i].token != token) {
                  tokens.push(user.tokens[i]);
                }
              }

              user.tokens = tokens;
              _context43.next = 10;
              return user.save();

            case 10:
              _context43.t0 = res.status(200);
              _context43.next = 13;
              return checkExistThenGet(req.user._id, _user["default"], {
                deleted: false
              });

            case 13:
              _context43.t1 = _context43.sent;

              _context43.t0.send.call(_context43.t0, _context43.t1);

              _context43.next = 20;
              break;

            case 17:
              _context43.prev = 17;
              _context43.t2 = _context43["catch"](0);
              next(_context43.t2);

            case 20:
            case "end":
              return _context43.stop();
          }
        }
      }, _callee43, null, [[0, 17]]);
    }))();
  },
  userInformation: function userInformation(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee44() {
      var _req$query, userId, currentUser, user, rate;

      return _regenerator["default"].wrap(function _callee44$(_context44) {
        while (1) {
          switch (_context44.prev = _context44.next) {
            case 0:
              _context44.prev = 0;
              _req$query = req.query, userId = _req$query.userId, currentUser = _req$query.currentUser;
              _context44.next = 4;
              return checkExistThenGet(userId, _user["default"], {
                deleted: false,
                populate: populateQuery
              });

            case 4:
              user = _context44.sent;

              if (!currentUser) {
                _context44.next = 13;
                break;
              }

              _context44.next = 8;
              return checkFollow([user], currentUser);

            case 8:
              _context44.next = 10;
              return checkinFavorites([user], currentUser);

            case 10:
              _context44.next = 12;
              return Rate.findOne({
                deleted: false,
                trader: userId,
                user: currentUser
              });

            case 12:
              rate = _context44.sent;

            case 13:
              user = _user["default"].schema.methods.toJSONLocalizedOnly(user, _i18n["default"].getLocale());
              res.status(200).send({
                user: user,
                rate: rate
              });
              _context44.next = 20;
              break;

            case 17:
              _context44.prev = 17;
              _context44.t0 = _context44["catch"](0);
              next(_context44.t0);

            case 20:
            case "end":
              return _context44.stop();
          }
        }
      }, _callee44, null, [[0, 17]]);
    }))();
  },
  deleteAccount: function deleteAccount(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee45() {
      var user;
      return _regenerator["default"].wrap(function _callee45$(_context45) {
        while (1) {
          switch (_context45.prev = _context45.next) {
            case 0:
              _context45.prev = 0;
              _context45.next = 3;
              return checkExistThenGet(req.user.id, _user["default"], {
                deleted: false
              });

            case 3:
              user = _context45.sent;
              user.deleted = true;
              _context45.next = 7;
              return user.save();

            case 7:
              _context45.next = 9;
              return ConfirmationCode.deleteMany({
                email: user.email
              });

            case 9:
              res.status(200).send('Deleted Successfully');
              _context45.next = 15;
              break;

            case 12:
              _context45.prev = 12;
              _context45.t0 = _context45["catch"](0);
              next(_context45.t0);

            case 15:
            case "end":
              return _context45.stop();
          }
        }
      }, _callee45, null, [[0, 12]]);
    }))();
  },
  openActiveChatHead: function openActiveChatHead(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee46() {
      var user, newUser;
      return _regenerator["default"].wrap(function _callee46$(_context46) {
        while (1) {
          switch (_context46.prev = _context46.next) {
            case 0:
              _context46.prev = 0;
              user = req.user;
              _context46.next = 4;
              return _user["default"].findByIdAndUpdate(user.id, {
                activeChatHead: true
              }, {
                "new": true
              });

            case 4:
              newUser = _context46.sent;
              res.status(200).send({
                user: newUser
              });
              _context46.next = 11;
              break;

            case 8:
              _context46.prev = 8;
              _context46.t0 = _context46["catch"](0);
              next(_context46.t0);

            case 11:
            case "end":
              return _context46.stop();
          }
        }
      }, _callee46, null, [[0, 8]]);
    }))();
  },
  closeActiveChatHead: function closeActiveChatHead(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee47() {
      var user, newUser;
      return _regenerator["default"].wrap(function _callee47$(_context47) {
        while (1) {
          switch (_context47.prev = _context47.next) {
            case 0:
              _context47.prev = 0;
              user = req.user;
              _context47.next = 4;
              return _user["default"].findByIdAndUpdate(user.id, {
                activeChatHead: false
              }, {
                "new": true
              });

            case 4:
              newUser = _context47.sent;
              res.status(200).send({
                user: newUser
              });
              _context47.next = 11;
              break;

            case 8:
              _context47.prev = 8;
              _context47.t0 = _context47["catch"](0);
              next(_context47.t0);

            case 11:
            case "end":
              return _context47.stop();
          }
        }
      }, _callee47, null, [[0, 8]]);
    }))();
  },
  validateDeleteUserAccount: function validateDeleteUserAccount() {
    var validations = [(0, _check.body)('userId').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('userIdRequired');
    })];
    return validations;
  },
  deleteUserAccount: function deleteUserAccount(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee48() {
      var userId, user;
      return _regenerator["default"].wrap(function _callee48$(_context48) {
        while (1) {
          switch (_context48.prev = _context48.next) {
            case 0:
              _context48.prev = 0;
              userId = (0, _CheckMethods.checkValidations)(req).userId;
              _context48.next = 4;
              return checkExistThenGet(userId, _user["default"], {
                deleted: false
              });

            case 4:
              user = _context48.sent;
              _context48.next = 7;
              return ConfirmationCode.deleteMany({
                email: user.email
              });

            case 7:
              user.deleted = true;
              _context48.next = 10;
              return user.save();

            case 10:
              res.status(200).send('Deleted Successfully');
              _context48.next = 16;
              break;

            case 13:
              _context48.prev = 13;
              _context48.t0 = _context48["catch"](0);
              next(_context48.t0);

            case 16:
            case "end":
              return _context48.stop();
          }
        }
      }, _callee48, null, [[0, 13]]);
    }))();
  },
  validateSocialMediaLogin: function validateSocialMediaLogin() {
    var validations = [(0, _check.body)('email').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }), (0, _check.body)('phone').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('PhoneIsRequired');
    }), (0, _check.body)('name').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('nameRequired');
    }), (0, _check.body)('image').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('imageRequired');
    }), (0, _check.body)('socialId').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('socialIdRequired');
    }), (0, _check.body)('socialMediaType').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('socialMediaTypeRequired');
    }).isIn(['FACEBOOK', 'TWITTER', 'INSTAGRAM', 'GOOGLE', 'APPLE']).withMessage(function () {
      return _i18n["default"].__('socialMediaTypeWrong');
    })];
    return validations;
  },
  socialMedialLogin: function socialMedialLogin(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee49() {
      var validatedBody, query, user, createdUser;
      return _regenerator["default"].wrap(function _callee49$(_context49) {
        while (1) {
          switch (_context49.prev = _context49.next) {
            case 0:
              _context49.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              query = {
                deleted: false,
                type: 'CLIENT',
                socialId: validatedBody.socialId
              }; // if (validatedBody.email) {
              //     validatedBody.email = (validatedBody.email.trim()).toLowerCase();
              //     query.email = validatedBody.email;
              // }

              _context49.next = 5;
              return _user["default"].findOne(query);

            case 5:
              user = _context49.sent;

              if (!user) {
                _context49.next = 10;
                break;
              }

              res.status(200).send({
                user: user,
                token: generateToken(user.id)
              });
              _context49.next = 14;
              break;

            case 10:
              _context49.next = 12;
              return _user["default"].create(validatedBody);

            case 12:
              createdUser = _context49.sent;
              res.status(200).send({
                user: createdUser,
                token: generateToken(createdUser.id)
              });

            case 14:
              _context49.next = 19;
              break;

            case 16:
              _context49.prev = 16;
              _context49.t0 = _context49["catch"](0);
              next(_context49.t0);

            case 19:
            case "end":
              return _context49.stop();
          }
        }
      }, _callee49, null, [[0, 16]]);
    }))();
  },
  validateVisitorSignUp: function validateVisitorSignUp() {
    var validations = [(0, _check.body)('token').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('token is required');
    }), (0, _check.body)('type').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('type is required');
    }).isIn(['ios', 'android', 'web']).withMessage(function () {
      return _i18n["default"].__('wrong type');
    })];
    return validations;
  },
  visitorSignUp: function visitorSignUp(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee50() {
      var validatedBody, oldUser, tokens;
      return _regenerator["default"].wrap(function _callee50$(_context50) {
        while (1) {
          switch (_context50.prev = _context50.next) {
            case 0:
              _context50.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);

              if (oldUser) {
                _context50.next = 8;
                break;
              }

              tokens = [];

              if (validatedBody.token && validatedBody.type) {
                tokens = [{
                  token: validatedBody.token,
                  type: validatedBody.type
                }];
              }

              _context50.next = 7;
              return _user["default"].create({
                tokens: tokens,
                type: 'VISITOR'
              });

            case 7:
              oldUser = _context50.sent;

            case 8:
              res.status(200).send({
                user: oldUser,
                token: generateToken(oldUser.id)
              });
              _context50.next = 14;
              break;

            case 11:
              _context50.prev = 11;
              _context50.t0 = _context50["catch"](0);
              next(_context50.t0);

            case 14:
            case "end":
              return _context50.stop();
          }
        }
      }, _callee50, null, [[0, 11]]);
    }))();
  },
  validateIncreaseViews: function validateIncreaseViews() {
    var validations = [(0, _check.body)('userId').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('userIdRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee51(value, _ref21) {
        var req;
        return _regenerator["default"].wrap(function _callee51$(_context51) {
          while (1) {
            switch (_context51.prev = _context51.next) {
              case 0:
                req = _ref21.req;
                _context51.next = 3;
                return checkExistThenGet(value, _user["default"], {
                  deleted: false,
                  type: 'TRADER'
                });

              case 3:
                req.trader = _context51.sent;

              case 4:
              case "end":
                return _context51.stop();
            }
          }
        }, _callee51);
      }));

      return function (_x22, _x23) {
        return _ref22.apply(this, arguments);
      };
    }())];
    return validations;
  },
  increaseViews: function increaseViews(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee52() {
      var validatedBody, trader;
      return _regenerator["default"].wrap(function _callee52$(_context52) {
        while (1) {
          switch (_context52.prev = _context52.next) {
            case 0:
              _context52.prev = 0;
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              trader = req.trader;
              trader.views = trader.views + 1;
              _context52.next = 6;
              return trader.save();

            case 6:
              res.status(200).send('Done');
              _context52.next = 12;
              break;

            case 9:
              _context52.prev = 9;
              _context52.t0 = _context52["catch"](0);
              next(_context52.t0);

            case 12:
            case "end":
              return _context52.stop();
          }
        }
      }, _callee52, null, [[0, 9]]);
    }))();
  },
  traderGetStatistics: function traderGetStatistics(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee53() {
      var user, followers, numberOfOrders, waitingOrders, acceptedOrders, rejectedOrders, counts, result;
      return _regenerator["default"].wrap(function _callee53$(_context53) {
        while (1) {
          switch (_context53.prev = _context53.next) {
            case 0:
              _context53.prev = 0;
              user = req.user;
              followers = createPromise(Follow.count({
                deleted: false,
                trader: user.id
              }));
              numberOfOrders = createPromise(Order.count({
                deleted: false,
                traders: {
                  $elemMatch: {
                    trader: user.id
                  }
                }
              }));
              waitingOrders = createPromise(Order.count({
                deleted: false,
                traders: {
                  $elemMatch: {
                    trader: user.id
                  }
                },
                'traders.$.status': 'WAITING'
              }));
              acceptedOrders = createPromise(Order.count({
                deleted: false,
                traders: {
                  $elemMatch: {
                    trader: user.id
                  }
                },
                'traders.$.status': 'ACCEPTED'
              }));
              rejectedOrders = createPromise(Order.count({
                deleted: false,
                traders: {
                  $elemMatch: {
                    trader: user.id
                  }
                },
                'traders.$.status': 'REJECTED'
              }));
              counts = [followers, numberOfOrders, waitingOrders, acceptedOrders, rejectedOrders];
              _context53.next = 10;
              return Promise.all(counts);

            case 10:
              result = _context53.sent;
              res.status(200).send({
                views: user.views,
                followers: result[0],
                numberOfOrders: result[1],
                waitingOrders: result[2],
                acceptedOrders: result[3],
                rejectedOrders: result[4]
              });
              _context53.next = 17;
              break;

            case 14:
              _context53.prev = 14;
              _context53.t0 = _context53["catch"](0);
              next(_context53.t0);

            case 17:
            case "end":
              return _context53.stop();
          }
        }
      }, _callee53, null, [[0, 14]]);
    }))();
  },
  uploadImage: function uploadImage(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee54() {
      var Image;
      return _regenerator["default"].wrap(function _callee54$(_context54) {
        while (1) {
          switch (_context54.prev = _context54.next) {
            case 0:
              _context54.prev = 0;
              _context54.next = 3;
              return handleImg(req, {
                attributeName: 'image',
                isUpdate: false
              });

            case 3:
              Image = _context54.sent;
              res.status(200).send({
                link: Image
              });
              _context54.next = 10;
              break;

            case 7:
              _context54.prev = 7;
              _context54.t0 = _context54["catch"](0);
              next(_context54.t0);

            case 10:
            case "end":
              return _context54.stop();
          }
        }
      }, _callee54, null, [[0, 7]]);
    }))();
  },
  /////////////////////////////////////////////////////////////////////////////////////////
  validateDriverAddTrader: function validateDriverAddTrader() {
    return [(0, _check.body)('image').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('imageRequired');
    }), (0, _check.body)('name').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('nameRequired');
    }), (0, _check.body)('email').optional().trim().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }).isEmail().withMessage(function () {
      return _i18n["default"].__('EmailNotValid');
    }).custom( /*#__PURE__*/function () {
      var _ref24 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee55(value, _ref23) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee55$(_context55) {
          while (1) {
            switch (_context55.prev = _context55.next) {
              case 0:
                req = _ref23.req;
                value = value.trim().toLowerCase();
                userQuery = {
                  email: value,
                  deleted: false
                };
                _context55.next = 5;
                return _user["default"].findOne(userQuery);

              case 5:
                if (!_context55.sent) {
                  _context55.next = 9;
                  break;
                }

                throw new Error(_i18n["default"].__('emailDuplicated'));

              case 9:
                return _context55.abrupt("return", true);

              case 10:
              case "end":
                return _context55.stop();
            }
          }
        }, _callee55);
      }));

      return function (_x24, _x25) {
        return _ref24.apply(this, arguments);
      };
    }()), (0, _check.body)('password').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('passwordRequired');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('PhoneIsRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee56(value, _ref25) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee56$(_context56) {
          while (1) {
            switch (_context56.prev = _context56.next) {
              case 0:
                req = _ref25.req;
                value = value.trim().toLowerCase();
                userQuery = {
                  phone: value,
                  deleted: false
                };
                _context56.next = 5;
                return _user["default"].findOne(userQuery);

              case 5:
                if (!_context56.sent) {
                  _context56.next = 9;
                  break;
                }

                throw new Error(_i18n["default"].__('phoneIsDuplicated'));

              case 9:
                return _context56.abrupt("return", true);

              case 10:
              case "end":
                return _context56.stop();
            }
          }
        }, _callee56);
      }));

      return function (_x26, _x27) {
        return _ref26.apply(this, arguments);
      };
    }()), (0, _check.body)('countryCode').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('countryCodeRequired');
    }), (0, _check.body)('countryKey').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('countryKeyRequired');
    }), (0, _check.body)('shopType').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('shopTypeRequired');
    }).isIn(['RETAIL', 'WHOLESALE', 'ALL']).withMessage(function () {
      return _i18n["default"].__('invalidShopType');
    }), (0, _check.body)('region').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('regionRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref28 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee57(val, _ref27) {
        var req;
        return _regenerator["default"].wrap(function _callee57$(_context57) {
          while (1) {
            switch (_context57.prev = _context57.next) {
              case 0:
                req = _ref27.req;
                _context57.next = 3;
                return checkExist(val, Region, {
                  deleted: false
                });

              case 3:
                return _context57.abrupt("return", true);

              case 4:
              case "end":
                return _context57.stop();
            }
          }
        }, _callee57);
      }));

      return function (_x28, _x29) {
        return _ref28.apply(this, arguments);
      };
    }()), (0, _check.body)('market').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('marketRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee58(val, _ref29) {
        var req;
        return _regenerator["default"].wrap(function _callee58$(_context58) {
          while (1) {
            switch (_context58.prev = _context58.next) {
              case 0:
                req = _ref29.req;
                _context58.next = 3;
                return checkExist(val, _user["default"], {
                  deleted: false,
                  type: 'MARKET'
                });

              case 3:
                return _context58.abrupt("return", true);

              case 4:
              case "end":
                return _context58.stop();
            }
          }
        }, _callee58);
      }));

      return function (_x30, _x31) {
        return _ref30.apply(this, arguments);
      };
    }()), (0, _check.body)('storeEmployees').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('storeEmployeesRequired');
    }).isArray().withMessage('must be an array'), // body('workTimes').optional().not().isEmpty().withMessage(() => { return i18n.__('workTimesRequired') }),
    (0, _check.body)('workDays').optional().isArray().withMessage(function () {
      return _i18n["default"].__('invalidWorkDays');
    }), (0, _check.body)('workPeriods').optional().isArray().withMessage(function () {
      return _i18n["default"].__('invalidWorkPeriods');
    }), (0, _check.body)('workPeriods.*.from').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('fromRequired');
    }), (0, _check.body)('workPeriods.*.to').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('toRequired');
    }), (0, _check.body)('subCategories').optional().isArray().withMessage(function () {
      return _i18n["default"].__('subCategoriesRequired');
    }), (0, _check.body)('subCategories.*').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('subCategoryRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref31 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee59(value) {
        return _regenerator["default"].wrap(function _callee59$(_context59) {
          while (1) {
            switch (_context59.prev = _context59.next) {
              case 0:
                _context59.next = 2;
                return checkExist(value, SubCategory, {
                  deleted: false
                });

              case 2:
                return _context59.abrupt("return", true);

              case 3:
              case "end":
                return _context59.stop();
            }
          }
        }, _callee59);
      }));

      return function (_x32) {
        return _ref31.apply(this, arguments);
      };
    }()), (0, _check.body)('slider').optional().isArray().withMessage(function () {
      return _i18n["default"].__('sliderRequired');
    }), (0, _check.body)('searchKeys').optional().isArray().withMessage(function () {
      return _i18n["default"].__('searchKeysRequired');
    }), (0, _check.body)('phones').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('phonesRequired');
    }).isArray().withMessage(function () {
      return _i18n["default"].__('invalidPhonesValue');
    }), (0, _check.body)('socialLinks').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('socialLinksRequired');
    }).isArray().withMessage(function () {
      return _i18n["default"].__('socialLinksValueError');
    }), (0, _check.body)('socialLinks.*.key').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('socialLinksRequired');
    }), (0, _check.body)('socialLinks.*.value').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('socialLinksRequired');
    }), (0, _check.body)('streetNumber').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('streetNumberRequired');
    }), (0, _check.body)('location.address').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('addressRequired');
    }), (0, _check.body)('location.longitude').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('longitudeRequired');
    }), (0, _check.body)('location.latitude').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('latitudeRequired');
    })];
  },
  addTrader: function addTrader(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee60() {
      var user, validatedBody, subscription, createdUser;
      return _regenerator["default"].wrap(function _callee60$(_context60) {
        while (1) {
          switch (_context60.prev = _context60.next) {
            case 0:
              _context60.prev = 0;
              user = req.user;

              if (!(user.type != 'DRIVER')) {
                _context60.next = 4;
                break;
              }

              return _context60.abrupt("return", next(new _ApiError["default"](401, 'غير مسموح')));

            case 4:
              validatedBody = (0, _CheckMethods.checkValidations)(req);
              validatedBody.driver = user.id;
              validatedBody.type = 'TRADER';

              if (validatedBody.email) {
                validatedBody.email = validatedBody.email.trim().toLowerCase();
              } // if (req.files && req.files['image'] && (req.files['image'].length > 0)) {
              //     validatedBody.image = fieldhandleImg(req, { attributeName: 'image', isUpdate: false })[0];
              // }
              // if (req.files && req.files['commercialRecord'] && (req.files['commercialRecord'].length > 0)) {
              //     validatedBody.commercialRecord = fieldhandleImg(req, { attributeName: 'commercialRecord', isUpdate: false })[0];
              // }
              // if (req.files && req.files['taxCard'] && (req.files['taxCard'].length > 0)) {
              //     validatedBody.taxCard = fieldhandleImg(req, { attributeName: 'taxCard', isUpdate: false })[0];
              // }


              _context60.next = 10;
              return Subscription.findOne({
                deleted: false,
                type: 'FREE'
              });

            case 10:
              subscription = _context60.sent;
              if (subscription) validatedBody.subscription = subscription.id;
              validatedBody.phoneVerified = true;

              if (validatedBody.location && validatedBody.location.address && validatedBody.location.longitude && validatedBody.location.latitude) {
                validatedBody.geoLocation = {
                  type: 'Point',
                  coordinates: [validatedBody.location.longitude, validatedBody.location.latitude]
                };
                validatedBody.address = validatedBody.location.address;
              }

              _context60.next = 16;
              return _user["default"].create(validatedBody);

            case 16:
              createdUser = _context60.sent;
              _context60.next = 19;
              return _user["default"].schema.methods.toJSONLocalizedOnly(createdUser, _i18n["default"].getLocale());

            case 19:
              createdUser = _context60.sent;
              res.status(200).send({
                user: createdUser
              });
              _context60.next = 26;
              break;

            case 23:
              _context60.prev = 23;
              _context60.t0 = _context60["catch"](0);
              next(_context60.t0);

            case 26:
            case "end":
              return _context60.stop();
          }
        }
      }, _callee60, null, [[0, 23]]);
    }))();
  },
  validateDriverAddMarket: function validateDriverAddMarket() {
    return [(0, _check.body)('categories').optional().isArray().withMessage(function () {
      return _i18n["default"].__('categoriesRequired');
    }), (0, _check.body)('categories.*.en').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('categoryRequired');
    }), (0, _check.body)('categories.*.ar').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('categoryRequired');
    }), (0, _check.body)('name').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('nameRequired');
    }), (0, _check.body)('username.ar').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('nameRequired');
    }), (0, _check.body)('username.en').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('nameRequired');
    }), (0, _check.body)('email').optional().trim().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('emailRequired');
    }).isEmail().withMessage(function () {
      return _i18n["default"].__('EmailNotValid');
    }).custom( /*#__PURE__*/function () {
      var _ref33 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee61(value, _ref32) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee61$(_context61) {
          while (1) {
            switch (_context61.prev = _context61.next) {
              case 0:
                req = _ref32.req;
                value = value.trim().toLowerCase();
                userQuery = {
                  email: value,
                  deleted: false
                };
                _context61.next = 5;
                return _user["default"].findOne(userQuery);

              case 5:
                if (!_context61.sent) {
                  _context61.next = 9;
                  break;
                }

                throw new Error(_i18n["default"].__('emailDuplicated'));

              case 9:
                return _context61.abrupt("return", true);

              case 10:
              case "end":
                return _context61.stop();
            }
          }
        }, _callee61);
      }));

      return function (_x33, _x34) {
        return _ref33.apply(this, arguments);
      };
    }()), (0, _check.body)('password').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('passwordRequired');
    }), (0, _check.body)('phone').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('PhoneIsRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref35 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee62(value, _ref34) {
        var req, userQuery;
        return _regenerator["default"].wrap(function _callee62$(_context62) {
          while (1) {
            switch (_context62.prev = _context62.next) {
              case 0:
                req = _ref34.req;
                value = value.trim().toLowerCase();
                userQuery = {
                  phone: value,
                  deleted: false
                };
                _context62.next = 5;
                return _user["default"].findOne(userQuery);

              case 5:
                if (!_context62.sent) {
                  _context62.next = 9;
                  break;
                }

                throw new Error(_i18n["default"].__('phoneIsDuplicated'));

              case 9:
                return _context62.abrupt("return", true);

              case 10:
              case "end":
                return _context62.stop();
            }
          }
        }, _callee62);
      }));

      return function (_x35, _x36) {
        return _ref35.apply(this, arguments);
      };
    }()), (0, _check.body)('countryCode').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('countryCodeRequired');
    }), (0, _check.body)('countryKey').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('countryKeyRequired');
    }), (0, _check.body)('slider').not().isEmpty().isArray().withMessage(function () {
      return _i18n["default"].__('sliderRequired');
    }), (0, _check.body)('region').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('regionRequired');
    }).custom( /*#__PURE__*/function () {
      var _ref37 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee63(val, _ref36) {
        var req;
        return _regenerator["default"].wrap(function _callee63$(_context63) {
          while (1) {
            switch (_context63.prev = _context63.next) {
              case 0:
                req = _ref36.req;
                _context63.next = 3;
                return checkExist(val, Region, {
                  deleted: false
                });

              case 3:
                return _context63.abrupt("return", true);

              case 4:
              case "end":
                return _context63.stop();
            }
          }
        }, _callee63);
      }));

      return function (_x37, _x38) {
        return _ref37.apply(this, arguments);
      };
    }()), (0, _check.body)('location.address').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('addressRequired');
    }), (0, _check.body)('location.longitude').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('longitudeRequired');
    }), (0, _check.body)('location.latitude').optional().not().isEmpty().withMessage(function () {
      return _i18n["default"].__('latitudeRequired');
    }), (0, _check.body)('shopType').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('shopTypeRequired');
    }).isIn(['RETAIL', 'WHOLESALE', 'ALL']).withMessage(function () {
      return _i18n["default"].__('invalidShopType');
    }), (0, _check.body)('image').not().isEmpty().withMessage(function () {
      return _i18n["default"].__('imageRequired');
    })];
  },
  addMarket: function addMarket(req, res, next) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee64() {
      var user, validatedBody, image, createdUser;
      return _regenerator["default"].wrap(function _callee64$(_context64) {
        while (1) {
          switch (_context64.prev = _context64.next) {
            case 0:
              _context64.prev = 0;
              user = req.user; // if (user.type != 'DRIVER') {
              //     return next(new ApiError(401, 'غير مسموح'))
              // }

              validatedBody = (0, _CheckMethods.checkValidations)(req);
              validatedBody.driver = user.id;
              validatedBody.type = 'MARKET';

              if (validatedBody.email) {
                validatedBody.email = validatedBody.email.trim().toLowerCase();
              }

              if (req.file) {
                image = handleImg(req, {
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
                };
                validatedBody.address = validatedBody.location.address;
              }

              _context64.next = 11;
              return _user["default"].create(validatedBody);

            case 11:
              createdUser = _context64.sent;
              _context64.next = 14;
              return _user["default"].schema.methods.toJSONLocalizedOnly(createdUser, _i18n["default"].getLocale());

            case 14:
              createdUser = _context64.sent;
              res.status(200).send({
                user: createdUser
              });
              _context64.next = 21;
              break;

            case 18:
              _context64.prev = 18;
              _context64.t0 = _context64["catch"](0);
              next(_context64.t0);

            case 21:
            case "end":
              return _context64.stop();
          }
        }
      }, _callee64, null, [[0, 18]]);
    }))();
  }
};
exports["default"] = _default;