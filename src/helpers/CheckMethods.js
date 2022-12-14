import ApiError from './ApiError';
import i18n from 'i18n'
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';

export const checkExist = async (id, Model, extraQuery = {}, errorMessage = '') => {
    if (typeof extraQuery != 'object') {
        errorMessage = extraQuery;
        extraQuery = {};
    }
    if (validId(id)) {
        let model = await Model.findOne({ _id: id, ...extraQuery }).lean();
        if (model)
            return;
    }
    throw new ApiError(404, errorMessage || `${Model.modelName} Not Found`);
};

export function checkLanguage( arModel, enModel , req) {
    var language = i18n.getLocale(req);
    try {
        if (language == 'ar'){
            return arModel;
        }
        else {
            return enModel;
        }
    } catch (error) {
        throw new ApiError(400, 'Can Not Set Language.');
    }
}

export const checkExistThenGet = async (id, Model, findQuery = { populate: '', select: '' }, errorMessage = '') => {
    let populateQuery = findQuery.populate || '', selectQuery = findQuery.select || '';

    if (typeof findQuery != 'object') {
        errorMessage = findQuery;
        findQuery = {};
    } else {
        delete findQuery.populate;
        delete findQuery.select;
    }

    if (validId(id)) {
        let model = await Model.findOne({ _id: id, ...findQuery })
            .populate(populateQuery).select(selectQuery);
        if (model)
            return model;
    }

    throw new ApiError(404, errorMessage || `${Model.modelName} Not Found`);
};

function deleteTempImages(req) {

}

export function deleteImages(images) {
    if (images.length && images.length > 0) {
        images.forEach(element => {
            if (fs.existsSync('.'+element))
                fs.unlink('.'+element, (err) => {
                    if (err) throw err;
                });
        });
    }
}

export const  createPromise = (query) => {
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

export const localeFn = (localeName) => (value, { req }) => req.__(localeName);

export function checkValidations(req) {
    const validationErrors = validationResult(req).array({ onlyFirstError: true });

    if (validationErrors.length > 0) {
        deleteTempImages(req);
        console.log(validationErrors);
        throw new ApiError(422, validationErrors);
    }
    return matchedData(req);
}

export function handleImgs(req, { attributeName = 'images', isUpdate = false } = {}, errMessage = '') {
    if (req.files && req.files.length > 0 || (isUpdate && req.body[attributeName])) { // .files contain an array of 'images'
        let images = [];
        if (isUpdate && req.body[attributeName]) {
            if (Array.isArray(req.body[attributeName]))
                images = req.body[attributeName];
            else
                images.push(req.body[attributeName]);
        }

        for (const img of req.files) {
            images.push(toImgUrl(req, img));
        }
        return images;
    }
    throw new ApiError.UnprocessableEntity(`${attributeName} are required`) || errMessage;
}

export function handleImg(req, { attributeName = 'img', isUpdate = false } = {}) {
    if (req.file || (isUpdate && req.body[attributeName]))
        return req.body[attributeName] || toImgUrl(req, req.file);

    throw new ApiError.UnprocessableEntity(`${attributeName} is required`);
}

export function handleFiles(req, { attributeName = 'files', isUpdate = false } = {}) {
    if (req.files && req.files.length > 0 || (isUpdate && req.body[attributeName])) {
        let files = [];
        if (isUpdate && req.body[attributeName]) {
            if (Array.isArray(req.body[attributeName]))
                files = req.body[attributeName];
            else
                files.push(req.body[attributeName]);
        }

        for (const file of req.files) {
            files.push(toFileUrl(req, file));
        }
        return files;
    }
    throw new ApiError.UnprocessableEntity(`${attributeName} are required`);
}

export function parseObject(arrayOfFields, update = false, fieldName = 'body') {
    return (req, res, next) => {
        try {
            for (let index = 0; index < arrayOfFields.length; index++) {
                var name = arrayOfFields[index];
                if (req[fieldName][name]) {
                    req[fieldName][name] = JSON.parse(req[fieldName][name]);
                }
            }
            return next()
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }
}

export function fieldhandleImg(req, { attributeName = 'images', isUpdate = false } = {}) {
    if (req.files && req.files[attributeName].length > 0 || (isUpdate && req.body[attributeName])) { // .files contain an array of 'images'
        let images = [];
        for (let index = 0; index < req.files[attributeName].length; index++) {
            let image = toImgUrl(req, req.files[attributeName][index]);
            images.push(image);
        }
        return images;
    }
    throw new ApiError.UnprocessableEntity(`${attributeName} are required`);
}

export function removeFile(file = '', files = []) {
    if (files.length > 0) {
        files.forEach(element => {
            fs.unlink(element, (err) => {
                if (err) throw err;
            });
        });
    } else {
        fs.unlink(file, (err) => {
            if (err) throw err;
        });
    }
}

export const validId = id => isNumeric(id);
export const validIds = ids => isArray(ids) && ids.every(id => validId(id));
export const isNumeric = value => Number.isInteger(parseInt(value));
export const isArray = values => Array.isArray(values);
export const isImgUrl = value => /\.(jpeg|jpg|png|PNG|JPG|JPEG)$/.test(value);
export const isLat = value => /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/.test(value);
export const isLng = value => /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/.test(value);
export const isYear = value => /^\d{4}$/.test(value);
export const isInternationNo = value => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value);
