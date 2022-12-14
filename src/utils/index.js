import ApiError from '../helpers/ApiError';

export * from './token';



// Convert Local Upload To Cloudinary Url  toImgUrlCloudinary
export function toImgUrl(req,multerObject) {
  try {
    multerObject.path = '/'+ multerObject.path ;
    return multerObject.path;
  }
  catch (err) {
    throw new ApiError(500, 'can not upload img with error -> '+ err.message);
  }
}

export function parseStringToArrayOfObjectsMw(fieldName, inWhich = 'body') {
  return (req, res, next) => {
      try {
          if (req[inWhich][fieldName]) {
            let arrOfObjectsAsString = req[inWhich][fieldName];
           
            let handledStringForParsing = arrOfObjectsAsString.replace(/([a-zA-Z0-9]+?):/g, '"$1":').replace(/'/g, '"');
            
              req[inWhich][fieldName] = JSON.parse(handledStringForParsing);
          }
          next();
      } catch (err) {
          //console.log(err);
          next(new ApiError(400, { message: `Failed To Parse "${fieldName}"` }));
      }
  }
}
/*
// Convert Local Upload To Full Url toImgUrl
export async function toImgUrlCloudinary(multerObject) {
  return `${config.appUrl}/${multerObject.destination}/${multerObject.filename}`;
}

*/
export function toFileUrl (req, multerObject) {
  try { 
    //multerObject.path = req.protocol+'://'+req.get('host')+'/'+multerObject.path;
    multerObject.path = '/' + multerObject.path;
    return multerObject.path;
  }
  catch (err) {
    throw new ApiError(500, 'Failed To Upload An Image due to network issue! Retry again...');
  }
}